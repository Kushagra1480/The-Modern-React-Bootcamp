import React, { Component } from 'react'
import axios from 'axios'
const API_BASE_URL = "https://deckofcardsapi.com/api/deck"

class Deck extends Component {
    constructor(props) {
        super(props)
        this.state = {deck: null}
        this.getCard = this.getCard.bind(this)
    }
    
    async componentDidMount() {
        let deckURL = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
        let deck = await axios.get(deckURL)
        this.setState({deck: deck.data})
    }

    async getCard() {
        let id = this.state.deck.deck_id
        let cardURL = `https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`
        let cardRes = await axios.get(cardURL)
        let card = cardRes.data.cards[0]
        console.log(cardRes.data)
        this.setState(st => ({
            drawn: [
                ...st.drawn,
                {
                    id: card.code,
                    image: card.image,
                    name: `${card.value} of ${card.suit}`
                }
            ]
        }))
    }

    render() {
        return (
            <div>
                <h1>Card Dealer</h1>
                <button onClick={this.getCard}>Get Card!</button>
            </div>
        )
    }
}

export default Deck