module.exports = function setupRESTapi(app) {
  app.get('/allansson', function(req,res){res.render('allansson');});
  app.get('/', function(req, res) {  res.render('main');});
  app.get('*', function(req, res) {  res.render('error');});
}