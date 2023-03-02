function go_back() {
    background("red")

    fill("blue")
    ellipse(mouseX, mouseY, 50, 50)

    if (mouseX > width - 50) {
        SceneNum = 1
    }

}