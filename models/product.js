const fs = require('fs');
const path = require('path');

const Cart = require('./cart')
const db = require('../util/database')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {

  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
      //내가 ㅇ데이터에서 읽은 내용들을 json형태로 함수인자로 쓸수있게 해준다!!d
    }
  });
};

module.exports = class Product {
  //Product만의 객체를 만들어버림!!@
  constructor(id, title, imageUrl, description, price) {
    this.id = id
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute('INSERT INTO products (title,price,description, imageUrl) VALUES (?,?,?,?)', 
    [this.title, this.price, this.description,this.imageUrl]
    )
  }

  static deleteById(id) {
    
  }

  static fetchAll() {
    //getProductsFromFile(cb);
    return db.execute('SELECT * From products')
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id])
  }

};
