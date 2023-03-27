const imageContainer = document.createElement("div");
imageContainer.classList.add("imageContainer");

const img = document.createElement("img");
img.classList.add("imageContainImage");
img.width = "640";
img.height = "360";
imageContainer.appendChild(img);

const styles = document.createElement("style");
styles.innerHTML = `
.imageContainer {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
	background: #1c1c1c91;
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
    align-items: center;
}

.imageContainer.hide {
	display: none;
}
`;

document.body.appendChild(styles);
document.body.appendChild(imageContainer);

imageContainer.classList.add("hide");
imageContainer.onclick = (e) => {
	imageContainer.classList.add("hide");
};

document.querySelectorAll("img").forEach((_image) => {
	if (!_image.classList.contains("imageContainImage")) {
		_image.onclick = (e) => {
			imageContainer.classList.remove("hide");
			img.src = _image.src;
		}
	}
});