const Posts = require('../models/posts');
const filter = require('filter-array');

const AWS  = require('aws-sdk');
const fs   = require('fs');
const path = require('path');

//cconfigurar AWS con las claves de acceso
AWS.config.update({
  accessKeyId: 'AKIARMTLG5FLZBVV2OVA',
  secretAccessKey: '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',
});
const s3 = new AWS.S3();

module.exports = {
  get: async function(req, res) {
    const { _id } = req.params;
    const posts = await Posts.find({ _id });
    let postsDESC = posts.sort(function(a, b) {
      if (a.createdAt < b.createdAt) {
        return 1;
      }
      if (a.createdAt > b.createdAt) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    res.json(postsDESC);
  },
  getPostsUser: async function(req, res) {
    const { _id_users } = req.params;
    const posts = await Posts.find({ _id_users });
    let postsDESC = posts.sort(function(a, b) {
      if (a.createdAt < b.createdAt) {
        return 1;
      }
      if (a.createdAt > b.createdAt) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    res.json(postsDESC);
  },
  getPostsByTitleOrContent: async function (req, res) {
    const { param, value } = req.params;
    const posts = await Posts.find();
    filterPosts = filter(posts, p=>p[param].incluedes(value))
    let postsDESC = filterPosts.sort(function(a, b) {
      if (a.createdAt < b.createdAt) {
        return 1;
      }
      if (a.createdAt > b.createdAt) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    res.json(postsDESC);
  },
  getAll: async function(req, res) {
    const { skip, limit } = req.params;
    const posts = await Posts.find({}, null, { skip, limit });
    let postsDESC = posts.sort(function(a, b) {
      if (a.createdAt < b.createdAt) {
        return 1;
      }
      if (a.createdAt > b.createdAt) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    res.json(postsDESC);
  },
  post: async function(req, res) {
    const data = req.body;
    const { _id } = req.params;
    delete data._id;
    const posts = await Posts.findByIdAndUpdate(_id, data);
    res.json({status: 'ok', message: 'Post modificado con exito!', detail: posts});
  },
  put: async function(req, res) {
    const { title, content, image } = req.body;
    const posts = new Posts({
      title,
      content,
      image,
      _id_users: req._id
    });

    posts
      .save()
      .then(data => {
        //console.log('mmm', data);
        res.json({
          status: 'ok',
          message: 'Post guardado con exito.',
          return: data
        });
      })
      .catch(err => {
        //console.log('rrrrr',err)
        res.json({
          status: 'err',
          message: 'Error al guardar el post.',
          detail: err
        });
      });
  },
  delete: async function(req, res) {
    const { _id } = req.params;
    console.log(req.params);
    await Posts.findByIdAndDelete(_id);
    res.json({
      status: 'ok',
      message: 'Post elminado correctamente.'
    });
  },
  uploadImg: async function (req, res) {
    console.log(req.files.file);
    //configuring parameters
    if (req.files) {
      const nameFile = req.files.file.name.split('.');
      const typeFile = req.files.file.mimetype;
      if(typeFile==="image/jpeg"){
        const params = {
          Bucket : 'practica-medellin',
          Body   : req.files.file.data,
          Key    : "posts/" + Date.now() + "." +nameFile[nameFile.length - 1],
          ACL    : 'public-read'
        };
    
        s3.upload(params, function (err, data) {
          //handle error
          if (err) {
            console.log("Error", err);
            res.json({status:'err', message: 'Error al subir el archivo!.', detail: err});
          }
    
          //success
          if (data) {
            res.json({status:'ok', location_image: data.Location});
            console.log("Uploaded in:", data.Location);
          }
        });
      }else{
        res.json({status: 'err', message: 'Tipo de archivo no admitido'})
      }
    }else{
      res.json({status:'ok'});
    }
  }
};
