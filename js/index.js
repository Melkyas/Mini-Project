(function () {

    var numToCalculate;

    //number 
    //-------------------------
    $('.number-section a').on('click', function () {
        var key = $(this).text();
        var inputValue = $('.monitor-section input').val()
        if (key == '=') return false
        $('.monitor-section input').val(inputValue + key)

        //push number
        if (numToCalculate) {
            numToCalculate = numToCalculate + key
        } else {
            numToCalculate = key
        }

    });

    //oparetore 
    //-------------------------
    $('.operators a').on('click', function () {

        var key = $(this).text();
        var oparet = $(this).attr('oparet');
        var inputValue = $('.monitor-section input').val();

        if (isNaN(inputValue.slice(-1)) || key == '=') return false
        $('.monitor-section input').val(inputValue + key);

        //push number
        numToCalculate = numToCalculate + oparet
    });


    //equle sing
    //show the result  
    //-------------------------
    $('.equle').on('click', function () {
        var inputValue = $('.monitor-section input').val();
        if (isNaN(inputValue.slice(-1))) {
            $('.monitor-section input').val(numToCalculate.slice(0, -1));

            //push number
            numToCalculate = numToCalculate.slice(0, -1);
        } else {
            $('.monitor-section input').val(calculate(numToCalculate));

            //push number
            numToCalculate = calculate(numToCalculate)
        }


    });


    $('.clear').on('click', function () {
        $('.monitor-section input').val('');
        numToCalculate = undefined
    });


    function calculate(input) {

        var f = {
            add: '+',
            sub: '-',
            div: '/',
            mlt: '*',
            mod: '%',
            exp: '^'
        };

        // Create array for Order of Operation and precedence
        f.ooo = [
            [
                [f.mlt],
                [f.div],
                [f.mod],
                [f.exp]
            ],
            [
                [f.add],
                [f.sub]
            ]
        ];

        input = input.replace(/[^0-9%^*\/()\-+.]/g, ''); // clean up unnecessary characters

        var output;
        for (var i = 0, n = f.ooo.length; i < n; i++) {

            // Regular Expression to look for operators between floating numbers or integers
            var re = new RegExp('(\\d+\\.?\\d*)([\\' + f.ooo[i].join('\\') + '])(\\d+\\.?\\d*)');
            re.lastIndex = 0; // take precautions and reset re starting pos

            // Loop while there is still calculation for level of precedence
            while (re.test(input)) {
                output = _calculate(RegExp.$1, RegExp.$2, RegExp.$3);
                if (isNaN(output) || !isFinite(output))
                    return output; // exit early if not a number
                input = input.replace(re, output);
            }
        }

        return output;

        function _calculate(a, op, b) {
            a = a * 1;
            b = b * 1;
            switch (op) {
                case f.add:
                    return a + b;
                    break;
                case f.sub:
                    return a - b;
                    break;
                case f.div:
                    return a / b;
                    break;
                case f.mlt:
                    return a * b;
                    break;
                case f.mod:
                    return a % b;
                    break;
                case f.exp:
                    return Math.pow(a, b);
                    break;
                default:
                    null;
            }
        }
    }


})()

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    navigator.notification.alert(
        `hello. I'm hoping will like this project. here is my info. email: abkorim1998@Gmail.com WhatsApp: +8801961696255 Telegram: +8801961696255 please contact me outside of Fiverr it's important. and don't talk about it on fiverr. I will remove this alert on the next version`, // message
        null, // callback
        'important note', // title
        'Done' // buttonName
    );
}