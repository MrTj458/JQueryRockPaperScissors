$(document).ready(function() {
  // Variables
  var choices = ['rock', 'paper', 'scissors']
  var scores = {win: 0, lose: 0, tie: 0 }

  var userSelection
  var computerSelection
  var result

  var $winnerText = $('#winnerText')

  // Functions
  function processClick(e) {
    userSelection = e.target.id
    computerSelection = computerGenSelection()
    result = compareSelections()
    scores[result]++
    showResult()
  }

  function computerGenSelection() {
    return choices[Math.floor(Math.random() * choices.length)]
  }

  function compareSelections() {
    if(userSelection === computerSelection) {
      return 'tie'
    }

    switch(userSelection) {
      case 'rock':
        return computerSelection === 'paper' ? 'lose' : 'win'
      case 'paper':
        return computerSelection === 'scissors' ? 'lose' : 'win'
      case 'scissors':
        return computerSelection === 'rock' ? 'lose' : 'win'
      default:
        return
    }
  }

  function totalGames() {
    return (scores.win + scores.lose + scores.tie)
  }

  function showResult() {
    $('#computerChoiceText').text('The computer chose ' + computerSelection + '!')

    $winnerText.removeClass()
    if(result === 'win') {
      $winnerText.addClass('green')
    } else if(result === 'lose') {
      $winnerText.addClass('red')
    } else {
      $winnerText.addClass('black')
    }

    $winnerText.text('You ' + result + '!')

    $('#winsText').text('Wins: ' + scores.win + ' - ' + ((scores.win / totalGames()) * 100).toFixed(2) + '%')
    $('#lossesText').text('Losses: ' + scores.lose + ' - ' + ((scores.lose / totalGames()) * 100).toFixed(2) + '%')
    $('#tiesText').text('Ties: ' + scores.tie + ' - ' + ((scores.tie / totalGames()) * 100).toFixed(2) + '%')
  }

  // Listeners
  $('.selection').each(function (index, entry) {
    $(entry).on('click', processClick)
  })

  $('#resetButton').on('click', function() {
    scores.win = 0, scores.lose = 0, scores.tie = 0
    $('#winsText').text('Wins: 0 - 0%')
    $('#lossesText').text('Losses: 0 - 0%')
    $('#tiesText').text('Ties: 0 - 0%')
    $('#computerChoiceText').text('')
    $winnerText.text('')
  })
})