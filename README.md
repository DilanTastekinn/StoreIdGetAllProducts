Proje veritabanında ipsizcambaz içerisindeki b2bproducts-b2cproducts-c2cproducts koleksiyonlarında yer alan mağazaya a karşılık gelen ürünlerin excell e aktarılmasını sağlamaktadır.

Projeyi çalıştırmak için

    npm init -y
    npm install
    npm start

İsteğimizi
GET http://localhost:4000/store/ adresinden
Hangi koleksiyonu istiyorsak
Body den {

"store_name":"b2b"

}
ekleyerek atıyoruz.

Kolleksiyonların isimlendirilmesi

- b2bproducts=b2b
- b2cproducts=b2c
- c2cproducts=c2c
