

const app = Vue.createApp({
    data() {
        return {
            alphabet: [
                {name: 'A', pick: 0}, {name: 'B', pick: 0}, {name: 'C', pick: 0}, {name: 'D', pick: 0}, {name: 'E', pick: 0}, {name: 'F', pick: 0}, {name: 'G', pick: 0}, {name: 'H', pick: 0}, {name: 'I', pick: 0}, {name: 'J', pick: 0}, {name: 'K', pick: 0}, {name: 'L', pick: 0}, {name: 'M', pick: 0}, {name: 'N', pick: 0}, {name: 'O', pick: 0}, {name: 'P', pick: 0}, {name: 'Q', pick: 0}, {name: 'R', pick: 0}, {name: 'S', pick: 0}, {name: 'T', pick: 0}, {name: 'U', pick: 0}, {name: 'V', pick: 0}, {name: 'W', pick: 0}, {name: 'X', pick: 0}, {name: 'Y', pick: 0}, {name: 'Z', pick: 0}
            ],
            // letterOne: '',
            // letterTwo: '',
            // letterThree: '',
            // letterFour: '',
            // letterFive: '',
            wordInfo: [],
            myWord: '',
            opponentsGuesses: [],
            opponentsGuessedWordArray: [],
            myGuesses: [],
            clicked: 'myWord',
            // numCorrectLetters: 0,
            
        }

    },
    methods: {
        pickLetter(letter){
            if(letter.pick === 0 || letter.pick === 1){
                letter.pick++
            } else {
                letter.pick = 0
            }
        },

        // checking if each letter in a word is unique
        isUnique(word){
            for (let i=0; i<word.length; i++) {
                if ( word.indexOf(word[i]) !== word.lastIndexOf(word[i]) ) {
                  return false
                }
              }
            return true
        },

        guessLength(word){
            if (word.length >= 2 && word.length <= 5){
                return true
            } else {
                return false
            }
        },

        jottoRules(){
            alert(`
Jotto (or Giotto) is a code-breaking word game for two players. Each player picks and writes down a secret word and attempts to guess the other's word first during their turn.
            
Gameplay:

Each player picks a secret word of five unique letters (no duplicate letters) and writes it down privately. Words must appear in a dictionary; generally no proper nouns are allowed. The object of the game is to correctly guess the other player's word first.

Players take turns: on a player's turn, they guess a two to five letter word with no duplicate letters, and the other player announces how many letters in that guess match a unique letter in their secret word. For example, if the secret word is OTHER and the guess is PEACH, the E and H in PEACH match an E and an H in OTHER, so the announced result is "2". (Letters don't need to occur in the same position.) On the next turn, players reverse roles.

Players keep track on paper of each guess and result, crossing out letters of the alphabet that (by deduction) cannot appear in the opponent's secret word. Eventually, one player has enough information to win by making a correct guess.

            `)
        },

        // trying to work around the async of javascript
        catchPayload(payload){
            this.wordInfo = payload

            this.enterWord(this.wordInfo)
        },
        
        enterWord(currentWord){
            // this.numCorrectLetters = 0
           
            console.log(currentWord, "this is the current word")

            // ------------------ secret word --------------------------------------------------------------
            if (this.myWord === '' && this.clicked === 'myWord'){
                // this is where my secret target word gets saved
                if (currentWord["word"].length !== 5 ) {
                    // this alert happens if i try to create a target word that is not 5 letters long and has duplicate letters
                    alert("Please enter a five letter word!")
                } else if (this.isUnique(currentWord["word"]) === false){
                    alert("Please enter a word where there are no duplicate letters!")
                } else {
                    this.myWord = currentWord["word"]
                console.log('my word from root is', this.myWord)
                }
            // ------------------- opponent's guesses -------------------------------------------------------   
            } else if (this.myWord !== '' && this.clicked === 'myWord') {
                
                // this is where my opponent's guesses go to try and figure out my secret word
                if (currentWord["word"] === this.myWord){
                    document.getElementById("opponents-guess").remove()
                    alert("You found the target word! Congrats!!")

                // alert for guessing same word twice
                } else if (this.opponentsGuessedWordArray.includes(currentWord["word"])){
                    console.log("There is something in the opponentsGuessedWordArray!", this.opponentsGuessedWordArray, currentWord["word"])
                    alert("You already guesses that word!")

                // alert for guessing a word that is not between 2-5 letters long
                } else if (this.guessLength(currentWord["word"]) === false){
                    alert("Please enter a guess that is 2 - 5 letters long!")

                // alert if the guessed word has duplicate letters
                } else if (this.isUnique(currentWord["word"]) === false){
                    alert("Please enter a word where there are no duplicate letters!")


                } else {
                    for (letter of currentWord["word"]){
                        // this is checking if each letter is in the secret word and changing inWord to true
                        if (this.myWord.includes(letter)){
                            console.log(`The letter ${letter} is in the target word!`)
                            console.log("This is the letter's index", currentWord["letters"][currentWord["word"].indexOf(letter)])
                            currentWord["letters"][currentWord["word"].indexOf(letter)]["inWord"] = true
                            currentWord["numCorrectLetters"] += 1
                            console.log("I changed the data!", currentWord)
                            console.log(`Opponent's guesses ${this.opponentsGuesses}`)
                            // console.log(`this is supposed to be a check of forEach ${this.opponentsGuesses.forEach((guess)=> {guess["word"]})}`)

                        
                        } else {
                            console.log(`Sorry! The letter ${letter} is NOT in the target word!`)
                        }
                    }
                    console.log("you have", this.numCorrectLetters, "correct!")
                    // adds the current word to the opponentsGuesses array, the opponentsGuessedWordArray, and zeros out the correct num 
                    this.opponentsGuesses.push(currentWord)
                    this.opponentsGuessedWordArray.push(currentWord["word"])
                    
                }
                
                
                console.log(`my opponent's guesses ${JSON.stringify(this.opponentsGuesses)} in the root`)
                console.log(`array of guessed words ${this.opponentsGuessedWordArray}`)
            
            // -------------------- my guesses --------------------------------------------
            } else {
                // these are my guesses of the secret word my opponent chose for me
                console.log('payload:', typeof(currentWord))
                this.myGuesses.push(currentWord)
                console.log('my guesses are', this.myGuesses)
                console.log('my guess', currentWord)
            }

        },

        next(e) {
            
            // let x = e.srcElement.id
            // let id = `this.${x}`
            // console.log(id)
            // id = e.data.toUpperCase()
            // console.log(id)
            
            e.target?.nextSibling?.focus()
          },
        last(e) {
            // console.log(e)
            // e.target?.delete()
            e.target?.previousSibling?.focus()

        },
        focus() {
            document.onload = function() {  
                document.getElementById("input-one").focus();
            }
        }

        
    },
    // watch: {
    //     enterWord(payload){
    //         // console.log('payload:', typeof(payload))
    //         // console.log('payload word:', payload["word"])
    //         // // console.log(`I entered letters ${this.letterOne}, ${this.letterTwo}, ${this.letterThree}, ${this.letterFour}, and ${this.letterFive} in the root`)
    //         // this.wordInfo = payload
    //         // console.log("is unique", this.isUnique(this.wordInfo["word"]))
    //         this.catchPayload(payload)
    //         console.log(`${JSON.stringify(this.wordInfo)} catchPayload works!`)

    //         if (this.wordInfo["word"].length !== 5 || this.isUnique(this.wordInfo["word"]) === false){
    //             alert("Please enter a five letter word where each letter is unique!")
    //         } else {
    //             if (this.myWord === '' && this.clicked === 'myWord'){
    //                 this.myWord = this.wordInfo["word"]
    //                 console.log('my word from root is', this.myWord)
    //             } else if (this.myWord !== '' && this.clicked === 'myWord') {
    //                 for (let i=0; i < this.myWord.length; i++){
    //                     console.log(i, this.myWord[i])

    //                     if (this.myWord[i] === this.wordInfo["word"][i]){
    //                         // this.wordInfo = payload
    //                         console.log(this.myWord[i], "is a match!")
    //                         // console.log("this is the wordInfo from the payload", this.wordInfo)

    //                         // figure out why this isnt working

    //                         this.wordInfo["letter"][i]["inWord"] = true
    //                         // console.log('should say true', this.wordInfo["letters"][i]["inWord"] === false)
    //                     } else {
    //                         console.log(this.wordInfo["word"][i], "is NOT a match!")
    //                     }
    //                 }
    //                 this.opponentsGuesses.push(this.wordInfo)
                    
    //                 console.log(`my opponent's guesses ${JSON.stringify(this.opponentsGuesses)} in the root`)
    //             } else {
    //                 console.log('payload:', typeof(payload))
    //                 this.myGuesses.push(this.wordInfo)
    //                 console.log('my guesses are', this.myGuesses)
    //                 console.log('my guess', payload)
    //             }
    //         }
            
            
            
            

            


    //     },
    // },
    mounted: function() {
        this.focus()
    }
})




app.component( 'word-input', {
    data(){
        return{
            letterOne: '',
            letterTwo: '',
            letterThree: '',
            letterFour: '',
            letterFive: '',
            word: '',
            id: 1,
            numCorrectLetters: 0,
        }
    },
    template:`
        <div>
            <input type="text" name="letterOne" class="letterInput" v-model="letterOne" maxlength="1" @input="next">
                
            <input type="text" name="letterTwo" class="letterInput" v-model="letterTwo" maxlength="1" @keyup.delete="last" @keyup.enter="enterWord" @input="next">
            
            <input type="text" name="letterThree" class="letterInput" v-model="letterThree" maxlength="1" @keyup.delete="last" @keyup.enter="enterWord" @input="next">
            
            <input type="text" name="letterFour" class="letterInput" v-model="letterFour" maxlength="1" @keyup.delete="last" @keyup.enter="enterWord" @input="next">
            
            <input type="text" name="letterFive" class="letterInput" v-model="letterFive" maxlength="1" @keyup.delete="last" @keyup.enter="enterWord" @input="next">
            

            <button @keyup.delete="last" @click="enterWord">ENTER</button>
        </div>
    `,
    methods: {
        enterWord(){
            
            this.word = `${this.letterOne.toUpperCase()}${this.letterTwo.toUpperCase()}${this.letterThree.toUpperCase()}${this.letterFour.toUpperCase()}${this.letterFive.toUpperCase()}`
            // console.log(`I entered letters ${this.letterOne}, ${this.letterTwo}, ${this.letterThree}, ${this.letterFour}, and ${this.letterFive}`)
            console.log('I am in the component', this.word)
            this.$emit('enter', {id: this.id, word: this.word, letters: [{letterOne: this.letterOne.toUpperCase(), inWord: false}, {letterTwo: this.letterTwo.toUpperCase(), inWord: false}, {letterThree: this.letterThree.toUpperCase(), inWord: false}, {letterFour: this.letterFour.toUpperCase(), inWord: false}, {letterFive: this.letterFive.toUpperCase(), inWord: false}], numCorrectLetters: this.numCorrectLetters})
            this.letterOne = ''
            this.letterTwo = ''
            this.letterThree = ''
            this.letterFour = ''
            this.letterFive = ''
            this.id++
            


        },
        next(e) {
            let regex = /^[a-zA-Z]+$/
            console.log('this is the input event', e.data)
            if (regex.test(e.data)){
                e.target?.nextSibling?.focus()
            } else {
                console.log('try again')
            }
            
          },
        last(e) {
            console.log(e)
            // e.target?.delete()
            e.target?.previousSibling?.focus()

        }
    }
    
})


app.mount('#app')




// const vm = new Vue({
//     el: '#app',
//     data: {
//         message: 'hello',
//         alphabet: [
//             {name: 'A', pick: 0}, {name: 'B', pick: 0}, {name: 'C', pick: 0}, {name: 'D', pick: 0}, {name: 'E', pick: 0}, {name: 'F', pick: 0}, {name: 'G', pick: 0}, {name: 'H', pick: 0}, {name: 'I', pick: 0}, {name: 'J', pick: 0}, {name: 'K', pick: 0}, {name: 'L', pick: 0}, {name: 'M', pick: 0}, {name: 'N', pick: 0}, {name: 'O', pick: 0}, {name: 'P', pick: 0}, {name: 'Q', pick: 0}, {name: 'R', pick: 0}, {name: 'S', pick: 0}, {name: 'T', pick: 0}, {name: 'U', pick: 0}, {name: 'V', pick: 0}, {name: 'W', pick: 0}, {name: 'X', pick: 0}, {name: 'Y', pick: 0}, {name: 'Z', pick: 0}
//         ],

//     },
//     methods: {
//         pickLetter(letter){
//             if(letter.pick === 0 || letter.pick === 1){
//                 letter.pick++
//             } else {
//                 letter.pick = 0
//             }
//         }
//     }
// })