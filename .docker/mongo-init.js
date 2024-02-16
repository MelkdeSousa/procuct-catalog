const catalog = db.getSiblingDB('catalog');

catalog.createUser({
    user: 'user',
    pwd: 'password',
    roles: [{ role: 'readWrite', db: 'catalog' }]
});
