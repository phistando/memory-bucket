module.exports = {
  home: function(req, res) {

    res.render('static_pages/index', {
      title: 'Hello WDI'
    });
  }
};
