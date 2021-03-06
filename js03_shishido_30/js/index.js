(() => {
  // セキュリティチェック
  "use strict";

  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyDDBV5vRkmUDWtcFl6p2ivMYdpioDg7iFg",
    authDomain: "our-baby-ba253.firebaseapp.com",
    databaseURL: "https://our-baby-ba253.firebaseio.com",
    projectId: "our-baby-ba253",
    storageBucket: "our-baby-ba253.appspot.com",
    messagingSenderId: "168968020376",
    appId: "1:168968020376:web:c2edb74b452d478074cbed",
  };
  firebase.initializeApp(config);

  // formインスタンスを定義
  const form = document.querySelector("form");
  // setfileインスタンスを作成
  const setfile = document.getElementById("setfile");
  // CloudStorageインスタンスを作成
  const storage = firebase.storage();
  // imgSampleインスタンスを作成
  const imgSample = document.getElementById("imgSample");

  // グローバル変数を定義
  var file_name;
  var blob;

  // setfileの変更で処理開始（変更があった要素がeで返される）
  setfile.addEventListener("change", (e) => {
    var file = e.target.files;
    // fileの名前を取得
    file_name = file[0].name;
    // blob形式に変換
    blob = new Blob(file, { type: "image/jpeg" });
    console.warn(blob);
  });

  // submitで処理開始
  form.addEventListener("submit", (e) => {
    // ページ遷移をなくす
    e.preventDefault();

    // storageのarea_imagesへの参照を定義
    var uploadRef = storage.ref("images/").child(file_name);
    uploadRef.put(blob).then((snapshot) => {
      console.log(snapshot.state);
      // アップロードしたファイルのurlを取得
      uploadRef
        .getDownloadURL()
        .then((url) => {
          // htmlに表示する
          imgSample.style.backgroundImage = "url(" + url + ")";
        })
        .catch((error) => {
          console.log(error);
        });
    });
    // valueリセットする
    file_name = "";
    blob = "";
  });
})();
