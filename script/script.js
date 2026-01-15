document.addEventListener("DOMContentLoaded", function () {

    let resultJson = []; // 엑셀 데이터
    let totalHint = 0; 
    let usedCodes = new Set(); 
    let currentItem = null;

    // ✅ (1) 로컬스토리지에서 hint 개수 불러오기
    let savedHintCount = localStorage.getItem("hintCount");
    if (savedHintCount !== null) {
        totalHint = parseInt(savedHintCount);
        $('.totalHint .count').text(totalHint + "개");
    }

    // ✅ (2) 힌트코드 불러오기
    let savedData = localStorage.getItem("myExcelData");
    if (savedData) {
        resultJson = JSON.parse(savedData);
        console.log("불러온 데이터:", resultJson);
    }

    // 관리자 페이지 열기 토글
    let status = false;
    $('footer .adminBtn').click(function () {
        status = !status;
        $('.adminWrap').css("display", status ? "flex" : "none");
    });

    // ✅ (3) 엑셀 업로드
    $('.uploadBtn').click(function () {
        let password = $('.adminWrap input[type="text"]').eq(0).val();
        let file = $('.adminWrap input[type="file"]')[0].files[0];

        if (password !== "9132") {
            alert("비밀번호가 틀렸습니다.");
            return;
        }

        if (!file) {
            alert("파일을 선택해주세요.");
            return;
        }

        let reader = new FileReader();
        reader.onload = function (e) {
            let data = new Uint8Array(e.target.result);
            let workbook = XLSX.read(data, { type: 'array' });
            let worksheet = workbook.Sheets[workbook.SheetNames[0]];
            resultJson = XLSX.utils.sheet_to_json(worksheet);
            localStorage.setItem("myExcelData", JSON.stringify(resultJson));
            alert("업로드 완료!");
            $('.adminWrap').css("display", "none");
        };
        reader.readAsArrayBuffer(file);
    });

    // ✅ (4) 힌트 리셋
    $('.hintResetBtn').click(function () {
        const resetChecked = $('.hint_reset_btn input[type="checkbox"]').is(':checked');
        const password = $('.adminWrap input[type="text"]').eq(1).val();

        if (!resetChecked) {
            alert("체크박스를 먼저 선택해주세요.");
            return;
        }
        if (password !== "9132") {
            alert("비밀번호가 틀렸습니다.");
            return;
        }

        totalHint = 0;
        usedCodes.clear();
        localStorage.setItem("hintCount", totalHint.toString());
        $('.totalHint .count').text("0개");
        alert("힌트 갯수가 초기화되었습니다!");
        $('.adminWrap').css("display", "none");

    });

    // ✅ (5) 힌트코드 검색
    $('.searchBtn').click(function () {
        let code = $('.searchBox input').val().trim();
        if (!code) {
            alert("힌트코드를 입력해주세요.");
            return;
        }

        let found = resultJson.find(item => item.힌트코드 == code);
        if (found) {
            currentItem = found;
            $('.contentDiv').text(found.힌트);
            $('.resultDiv').text("");

            if (!usedCodes.has(code)) {
                totalHint++;
                usedCodes.add(code);
                localStorage.setItem("hintCount", totalHint.toString()); // ✅ 저장
            }

            $('.totalHint .count').text(totalHint + "개");
            $('.btnDiv').show();
        } else {
            alert("해당 힌트코드를 찾을 수 없습니다.");
            $('.contentDiv, .resultDiv').text("");
            $('.btnDiv').hide();
        }
    });

    $('.showResult').click(function () {
        if (currentItem) {
            $('.resultDiv').text(currentItem.정답);
        } else {
            alert("먼저 힌트코드를 검색해주세요.");
        }
    });

    $('.backBtn').click(function () {
        $('.btnDiv').hide();
        $('.searchBox input').val('');
        $('.contentDiv, .resultDiv').text('');
        currentItem = null;
    });
});
