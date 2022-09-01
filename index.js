// Simple utility functions

const lib = {
    get: selector => document.querySelector(selector),
    getAll: selector => document.querySelectorAll(selector),
    onEvent: (el, event, func) => el.addEventListener(event, func),
    onClick: (el, func) => el.addEventListener('click', func)
}

const game = {
    time: 0,
    periods: {
        current: 1,
        duration: 15,
        total: 4,
        display: lib.get('#period output'),
        buttons: {
            prev: lib.get('#period button'),
            next: lib.getAll('#period button')[1],
        }
    }
}
const Team = class{
    constructor(name) {
        this.name = name

        this.score = {
            val: 0,
            buttons: lib.getAll('#' + name + '-display .score button'),
            display: lib.get('#' + name + '-display .score output')
        }

        this.fouls = {
            val: 0,
            button: lib.get('#' + name + '-display .fouls button'),
            display: lib.get('#' + name + '-display .fouls output')
        }
        
        this.possession = {
            val: 0,
            button: lib.get('.' + name + '.possession button'),
            display: lib.get('.' + name + '.possession output')
        }

        addTeamHandlers(this);
    }
}

function addTeamHandlers(team) {
    // Attach handlers to score increment buttons
    for (const button of team.score.buttons) {
        button.onclick = function() {
            const points = parseInt(this.value)
            team.score.val = team.score.val + points
            team.score.display.textContent = team.score.val
        }
    }
    // Attach handler to foul increment button
    team.fouls.button.onclick = function() {
        const fouls = parseInt(this.value)
        team.fouls.val = team.fouls.val + fouls
        team.fouls.display.textContent = team.fouls.val
    }
    // Attach handler to posession button
    team.possession.button.onclick = () => togglePossession(team)
}

function togglePossession(team) {
    const activateDisplay = (display) => display.classList.add('active')
    const deactivateDisplay = (display) => display.classList.remove('active')

    const currentPossession = home.possession.val ? 'home' : guest.possession.val ? 'guest' : 0

    if (currentPossession === 0) {
        team.possession.val = 1
        activateDisplay(team.possession.display)
    } else if (currentPossession === team.name) {
        team.possession.val = 0
        deactivateDisplay(team.possession.display)
    } else {
        const competition = (team.name === 'home') ? guest : home
        team.possession.val = 1
        competition.possession.val = 0
        activateDisplay(team.possession.display)
        deactivateDisplay(competition.possession.display)
    }
}

function addMiscHandlers() {
    game.periods.buttons.prev.onclick = function() {
        if (game.periods.current > 1) {
            game.periods.current--
            game.periods.display.textContent = game.periods.current
        }
    }
    game.periods.buttons.next.onclick = () => {
        if (game.periods.current < game.periods.total) {
            game.periods.current++
            game.periods.display.textContent = game.periods.current
        }
    }
}

function powerOff() {
    for (const output of document.querySelectorAll('output')) {
        output.style.color = '#00000000';
    }
}

const home = new Team('home')

const guest = new Team('guest')

addMiscHandlers()

// powerOff()