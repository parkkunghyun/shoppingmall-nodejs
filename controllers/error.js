exports.get404 = (req, res, next) => {
    //템플릿에서 데이터를 받는 방식은 동일!
    res.status(404).render('404', {pageTitle: 'Page Not Found', path: '/404'});
    // res.status(404).render('404', {pageTitle: 'Page Not Found'});
}