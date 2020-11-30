class PlayerComponent {
    static all = []
    
    constructor(playerObj) {
        this.player = playerObj
        PlayerComponent.all.push(this)
    }

    render(parentElement) {
        this.playerDiv = document.createElement("div")

        this.playerDiv.className = "player"
        this.playerDiv.dataset.number = this.player.number

        this.playerDiv.innerHTML = `
        <h3>${this.player.name} (<em>${this.player.nickname}</em>)</h3>
        <img src="${this.player.photo}" alt="${this.player.name}">
        <p class="likes">${this.player.likes} likes</p>
        <button class="like-button">❤️</button>
        `

        const likeButton = this.playerDiv.querySelector(".like-button")
        likeButton.addEventListener("click", this.like)

        parentElement.append(this.playerDiv)
    }

    like = () => {
        this.player.likes++
        const likesPTag = this.playerDiv.querySelector(".likes")
        likesPTag.textContent = `${this.player.likes} likes`

        // fetch
        const url = `${BASE_URL}/players/${this.player.id}`
        const config = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ likes: this.player.likes })
        }
    }
}
