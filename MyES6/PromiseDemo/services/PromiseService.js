/**
 * Created by heke on 2016/5/31.
 */
let a = 1;

function* g() {
    yield 100;
    console.log(a + 100);
}

var it = g();
it.next();
it.next();

function timeout(ms) {
    return new Promise((resolve) => {
            setTimeout(resolve, ms);
});
}

timeout(100).then(() => {
    console.log('done');
});


