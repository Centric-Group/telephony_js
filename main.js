(() => {
    const setUp = () => {
        const createDiv = () => {
            const e = document.createElement('div');
            return document.body.appendChild(e), e
        }
        const createImg = () => {
            const e = document.createElement('img');
            return document.body.appendChild(e), e
        }
        const addI = (e, i) => {
            e.id = i;
            return e
        }

        let isOnCall = false

        let widget = createDiv(), widget_label = document.createElement('span');
        let widget_img = createImg();
        widget = addI(widget, "widget_container");
        widget_img = addI(widget_img, "widget_img");
        widget.appendChild(widget_img);
        widget_label.innerHTML = "Contact Us";
        widget.appendChild(widget_label);

        const setPosition = ({ bottom, right }) => {
            widget.style.bottom = `${bottom}px`;
            widget.style.right = `${right}px`;
        }
        const setLabel = (label) => {
            widget_label.innerText = label;
        }
        const setImage = (image) => {
            widget_img.src = image;
        }

        const setBG = (color) => {
            widget.style.backgroundColor = color;
        }

        const setCorners = (corners) => {
            widget.style.borderRadius = `${corners}px`;
        }

        const setAnimation = (rotate) => {
            widget_img.style.transform = `rotate(${rotate}deg)`;
        }

        const getE = () => {
            if (!window.blinkWidget) {
                return {
                    position: { bottom: 30, right: 30 },
                    label: "Contact Us",
                    image: "./answer.png",
                    bg: "#3DAC47",
                    anim: 360,
                    corners: 30
                }
            } else {
                let position = { bottom: 30, right: 30 };
                let tmp = window.blinkWidget.position;
                if (tmp != null && tmp != undefined) {
                    if (tmp.bottom != null && tmp.bottom != undefined) position.bottom = tmp.bottom;
                    if (tmp.right != null && tmp.right != undefined) position.right = tmp.right;
                }
                return {
                    position: position,
                    label: window.blinkWidget.label != undefined && window.blinkWidget.label != null ? window.blinkWidget.label : "Contact Us",
                    image: window.blinkWidget.image != undefined && window.blinkWidget.image != null ? window.blinkWidget.image : "./answer.png",
                    bg: window.blinkWidget.bg != undefined && window.blinkWidget.bg != null ? window.blinkWidget.bg : "#3DAC47",
                    anim: window.blinkWidget.anim != undefined && window.blinkWidget.anim != null ? window.blinkWidget.anim : 360,
                    corners: window.blinkWidget.corners != undefined && window.blinkWidget.corners != null ? window.blinkWidget.corners : 30
                }
            }
        }

        const init = () => {
            const e = getE()
            setPosition(e.position);
            setLabel(e.label);
            setImage(e.image);
            setBG(e.bg);
            setAnimation(e.anim);
            setCorners(e.corners)
        }
        init()

        widget.addEventListener("click", function () {
            const e = getE()

            widget.classList.toggle('active');
            widget_img.classList.toggle('onCall');

            setLabel(!isOnCall ? "Try Again Later" : e.label);
            setImage(!isOnCall ? "./decline.png" : e.image)
            setBG(!isOnCall ? "#ac3d3d" : e.bg);
            setAnimation(!isOnCall ? 0 : e.anim);
            isOnCall = !isOnCall;
        })

        let styles = document.head.appendChild(document.createElement("style"));
        styles.innerHTML = `#widget_container{
            position: fixed;
            padding: 10px 20px;
            border-radius: 30px;
            padding: 15px 15px 15px 50px;
            cursor: pointer;
            box-shadow: 0 0px 20px 0 rgba(0, 0, 0, .25);
            border:0;
            z-index:2147483646;
            text-align: center;
            color: white;
            transition: all 1s;
        }
        #widget_container.active{
            padding: 15px 50px 15px 15px;
        }

        #widget_img{
            position: absolute;
            width: 45px;
            left: -3%;
            top: 1px;
            bottom: 0;
            object-fit: cover;
            transition: all 1s;
        }

        #widget_img.onCall{
            left: 75%;
        }`

    }


    "interactive" == document.readyState || "complete" == document.readyState ? setUp() : document.addEventListener ? document.addEventListener("readystatechange", function () {
        "interactive" == document.readyState && setUp()
    }) : document.attachEvent && document.attachEvent("readystatechange",
        function () {
            "interactive" == document.readyState && setUp()
        }
    )

})()