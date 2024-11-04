# Typescript-Node-Sequelize

**dependencies**
**@types/node:** Node.js için TypeScript tür tanımlamaları.
**bcrypt:** Şifre hashleme ve doğrulama için kullanılır.
**cors:** Cross-Origin Resource Sharing (CORS) ayarlarını yönetir. Farklı alan adlarından gelen istekleri yönetmek için kullanılır.
**dotenv:** Ortam değişkenlerini .env dosyasından yükler.
**errorhandler:** Hata yönetimi için kullanılır.
**express:** Web uygulamaları ve API'ler oluşturmak için kullanılan bir framework.
**joi:** Veri doğrulama ve şema tanımlama için kullanılır.
**jsonwebtoken:** JSON Web Token (JWT) oluşturma ve doğrulama için kullanılır.
**lodash:** Dizi, nesne, fonksiyon ve string işlemleri gibi birçok alanda yardımcı fonksiyonlar sunar. Bu kütüphane, kodunuzu daha okunabilir, daha kısa ve daha verimli hale getirmeye yardımcı olur.
**morgan:** Node.js ve Express.js uygulamaları için kullanılan bir HTTP istek loglama middleware'idir. Gelen HTTP isteklerini belirli bir formatta loglar ve bu loglar, uygulamanızın çalışması sırasında neler olduğunu anlamanıza yardımcı olur. Morgan, çeşitli log formatları sunar ve log formatlarını özelleştirmenize olanak tanır. Ayrıca, logları dosyaya yazma özelliği ile üretim ortamlarında logların saklanması ve analiz edilmesi için faydalıdır.
**nodemailer:** E-posta gönderimi için kullanılır.
**otplib:** JavaScript ve Node.js projelerinde tek seferlik şifreler (OTP) oluşturmak ve doğrulamak için kullanılan güçlü bir kütüphanedir. Hem TOTP hem de HOTP algoritmalarını destekler ve iki faktörlü kimlik doğrulama sistemlerinde yaygın olarak kullanılır. otplib, kolay entegrasyon, özelleştirilebilirlik ve güvenilirlik sağlar.
**pg:** PostgreSQL veritabanı istemcisi.
**pg-hstore:** PostgreSQL için JSON veri türü desteği sağlar.
**sequelize:** Promise tabanlı Node.js ORM (Object-Relational Mapping) aracı.
**swagger-jsdoc:** Swagger/OpenAPI belgeleri oluşturmak için kullanılır.
**swagger-ui-express:** Swagger belgelerini Express uygulamasında görüntülemek için kullanılır.
**winston:** Node.js uygulamaları için popüler ve esnek bir loglama kütüphanesidir. Winston, loglama işlemlerini yönetmek ve yapılandırmak için çeşitli özellikler sunar. Bu kütüphane, log mesajlarını farklı seviyelerde (örneğin, hata, uyarı, bilgi) ve farklı hedeflere (örneğin, dosya, konsol, uzak sunucu) yönlendirme yeteneği sağlar.

**devDependencies**
Bu bölüm, geliştirme sürecinde kullanılan ancak uygulamanın çalışması için gerekli olmayan paketleri içerir.

**@types/bcrypt:** bcrypt için TypeScript tür tanımlamaları.
**@types/concurrently:** concurrently için TypeScript tür tanımlamaları.
**@types/cors:** cors için TypeScript tür tanımlamaları.
**@types/errorhandler:** errorhandler için TypeScript tür tanımlamaları.
**@types/eslint:** eslint için TypeScript tür tanımlamaları.
**@types/express:** express için TypeScript tür tanımlamaları.
**@types/jsonwebtoken:** jsonwebtoken için TypeScript tür tanımlamaları.
**@types/lodash:** lodash için TypeScript tür tanımlamaları.
**@types/morgan:** morgan için TypeScript tür tanımlamaları.
**@types/nodemailer:** nodemailer için TypeScript tür tanımlamaları.
**@types/request:** request için TypeScript tür tanımlamaları.
**@types/request-promise:** request-promise için TypeScript tür tanımlamaları.
**@types/swagger-jsdoc:** swagger-jsdoc için TypeScript tür tanımlamaları.
**@types/swagger-ui-express:** swagger-ui-express için TypeScript tür tanımlamaları.
**@typescript-eslint/eslint-plugin:** TypeScript için ESLint eklentisi.
**@typescript-eslint/parser:** TypeScript kodunu parse etmek için kullanılır.
**concurrently:** Birden fazla komutu aynı anda çalıştırmak için kullanılır.
**eslint:** Kod kalitesini ve stilini kontrol etmek için kullanılır.
**eslint-config-prettier:** Prettier ile çakışan ESLint kurallarını devre dışı bırakır.
**prettier:** Kod formatlama aracı.
**ts-node-dev:** TypeScript dosyalarını çalıştırmak ve otomatik yeniden başlatma sağlamak için kullanılır.
**typescript:** TypeScript dil desteği.

# API Belgeleri

Kullanılabilir API'lerin listesini ve özelliklerini görüntülemek için sunucuyu çalıştırın ve tarayıcınızda http://localhost:3000/api/docs/ adresine gidin. Bu belge sayfası, rota dosyalarında yorumlar olarak yazılan swagger tanımları kullanılarak otomatik olarak oluşturulur.
