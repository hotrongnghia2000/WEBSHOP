const cloudinary = require('cloudinary').v2;
var slugify = require('slugify');
const Product = require('../models/product');
const MyError = require('../class/HandleThrowErr');

exports.delete = async (req, res) => {
  const { id } = req.params;

  const resDB = await Product.findByIdAndDelete(id);
  return res.status(200).json({
    status: 'SUCCESS',
    data: resDB,
  });
};

exports.deleteChecks = async (req, res) => {
  const query = req.query;
  const resDB = await Product.deleteMany({ _id: query.checkBrands });
  return res.status(200).json({
    status: 'SUCCESS',
    data: resDB,
  });
};

exports.add = async (req, res) => {
  const body = req.body;
  const files = req.files;
  const data = { ...body, desc: JSON.parse(body.desc) };
  for (const obj in files) {
    for (const arr of files[obj]) {
      data[obj] = [];
      data[obj].push(arr);
    }
  }

  // console.log(data);
  // console.log(file);
  data.slug = slugify(body.name, { lower: true });
  const resDB = await Product.create(data);
  return res.status(200).json({
    status: 'SUCCESS',
    data: resDB,
  });
};
exports.getAll = async (req, res) => {
  const resDB = await Product.find();
  return res.status(200).json({
    status: 'SUCCESS',
    data: resDB,
  });
};

exports.update = async (req, res) => {
  const params = req.params;
  const body = req.body;
  const files = req.files;

  if (files) {
    // Giữ lại thông tin của product trước khi update
    var product = await Product.findById(params.id);
    // gán thông tin của file đã upload lên cloudinary vào body
    // body.thumb có thể nhận nhiều property của object, nhưng khi đưa lên db thì db chỉ nhận những property đã khai báo trên schema
    // muốn nhận tất cả thì khai báo schema type object
    body.thumb = files.thumb[0];
    body.images = files.images;
  }
  if (!Object.keys(body).length)
    throw new MyError('không có gì để update', 400);
  // slugify
  if (body.name) body.slug = slugify(body.name, { lower: true });

  const resDB = await Product.findByIdAndUpdate(params.id, body, {
    new: true,
  });
  // clear file cũ trên cloudinary
  if (resDB && files) {
    console.log(files.thumb[0]);
    if (files.thumb[0] && product.thumb[0])
      cloudinary.uploader.destroy(product.thumb.filename);
    if (files.images && product.images) {
      for (let item of product.images) {
        cloudinary.uploader.destroy(item.filename);
      }
    }
  }

  return res.status(200).json({
    status: 'SUCCESS',
    data: resDB,
  });
};

exports.filter = async (req, res) => {
  const query = req.query;

  // 1.FILTER
  // do query là object, myQuery dùng operator '...' để chiếu đến 1 ô nhớ mới khác với biến query
  let myFilter = { ...query };
  // tách một số giá trị ra khỏi myFilter
  const removalList = ['page', 'limit', 'sort', 'select'];
  for (const el of removalList) delete myFilter[el];
  // chuyển đổi myFilter về string để thêm dấu $ vào trước gt, gte, lt, lte trên tất cả giá trị của object
  // nếu không chuyển đổi về string thì chỉ định từ property
  myFilter = JSON.stringify(myFilter).replace(
    // match với bất kì từ trong ngoặc, phía trước và phía sau nó khác chữ cái, vd: xgte, gtex, xgtex
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  // chuyển đổi myFilter về JSON
  myFilter = JSON.parse(myFilter);

  // 2. SORT
  const mySorter = query.sort?.split(',').join(' ') || '-createdAt';

  // 3. SELECT
  const mySelector = query.select?.split(',').join(' ');

  // 4. PAGINATION
  const page = query.page || 1;
  const limit = query.limit || 2;
  const skip = (page - 1) * limit;

  const resDB = await Product.find(myFilter)
    .sort(mySorter)
    .select(mySelector)
    .skip(skip)
    .limit(limit);

  return res.status(200).json({
    status: 'SUCCESS',
    count: resDB.length,
    data: resDB,
  });
};

exports.rate = async (req, res) => {
  const params = req.params;
  const body = req.body;
  const user = req.user;

  const product = await Product.findById(params.id);
  // kiểm tra người dùng từng đánh giá sản phẩm này chưa
  const isRated = product.ratings.find(
    (el) => el.user_id.toString() === user._id
  );
  // xử lý khi chưa đánh giá trước đó
  let resDB = {};
  if (!isRated) {
    const updateRatingAvg =
      product.rating_avg +
      (body.star - product.rating_avg) / (product.ratings.length + 1);
    resDB = await Product.findByIdAndUpdate(
      params.id,
      {
        rating_avg: updateRatingAvg,
        $push: {
          ratings: {
            user_id: user._id,
            star: body.star,
          },
        },
      },
      { new: true }
    );
  }
  // xử lý khi đã đánh giá rồi
  else {
    const ratingAvg = product.rating_avg || 0;
    const updateRatingAvg =
      ratingAvg + (body.star - isRated.star) / product.ratings.length;
    resDB = await Product.updateOne(
      { ratings: isRated },
      // $ trỏ đến elment được tìm thấy trong mảng ratings thỏa  điều kiện isRated
      { $set: { 'ratings.$.star': body.star, rating_avg: updateRatingAvg } },
      { new: true }
    );
  }

  return res.status(200).json({
    status: 'SUCCESS',
    data: resDB,
  });
};

exports.comment = async (req, res) => {
  const params = req.params;
  const body = req.body;
  const user = req.user;

  const resDB = await Product.findByIdAndUpdate(
    params.id,
    {
      $push: {
        comments: {
          user_id: user._id,
          content: body.content,
        },
      },
    },
    { new: true }
  );

  return res.status(200).json({
    status: 'SUCCESS',
    data: resDB,
  });
};

exports.repComment = async (req, res) => {
  const params = req.params;
  const body = req.body;
  const user = req.user;

  const resDB = await Product.findByIdAndUpdate(
    params.id,
    {
      $push: {
        comments: {
          user_id: user._id,
          content: body.content,
          parent_id: params.parent_id,
        },
      },
    },
    { new: true }
  );

  return res.status(200).json({
    status: 'SUCCESS',
    data: resDB,
  });
};
