// Daret — simulateur. Ton code commence ici.
// Le HTML (index.html) est déjà intégré : lis-le, repère les id et les data-*, puis fais-le vivre.
let ParticipantsCompteur = 0
let daret_formulaire = document.getElementById('daret-form')

function isNameValid(nom)
{
    const regex = /[^\p{L}0-9 -]/u
    nom = nom.trim()
    nom = nom.replace(/ +/, " ")
    if(nom.length >= 3 && nom.length <= 40)
    {
        if (regex.test(nom)) {
            return false
        }
        else
        {
            return true
        }
        
    }
    
    return false
}

function isNumberBetween(Num, from, to)
{
    Num = Number(Num)
    if (Number.isNaN(Num) || !Number.isInteger(Num)) {
        return false;
    }
    if (Num < from || Num > to) {
        return false
    }
    return true
}
function ValidateNameField(e)
{
    let NomCercle = document.getElementById('nom-cercle')
    let erreurP = document.getElementById('nom-cercle-erreur')
    if (!isNameValid(NomCercle.value)) {
        erreurP.textContent = "Le nom n'est pas valide!"
        erreurP.classList.remove('hidden')
        e.preventDefault()
        NomCercle.setAttribute('aria-invalid', true)
        NomCercle.setAttribute('aria-describedby', 'date-debut-erreur')
    }
    else 
    {
        erreurP.textContent = ""
        erreurP.classList.add('hidden')
        NomCercle.removeAttribute('aria-invalid')
        NomCercle.removeAttribute('aria-describedby')
    }
}
function ValidateCotisationField(e)
{
    let Cotisation = document.getElementById('cotisation')
    let erreurP = document.getElementById('cotisation-erreur')
    if (!isNumberBetween(Cotisation.value, 100, 50000)) {
        erreurP.textContent = "Le nombre n'est pas valide! [100 MAD -50000 MAD]"
        erreurP.classList.remove('hidden')
        e.preventDefault()
        Cotisation.setAttribute('aria-invalid', true)
        Cotisation.setAttribute('aria-describedby', 'date-debut-erreur')
    }
    else 
    {
        erreurP.textContent = ""
        erreurP.classList.add('hidden')
        Cotisation.removeAttribute('aria-invalid')
        Cotisation.removeAttribute('aria-describedby')
    }
}
function ValidatePeriodiciteField(event)
{

    let arr = ['hebdomadaire', 'quinzaine', 'mensuelle']
    let Periodicite = document.getElementById("periodicite")
    let PeriodiciteErreur = document.getElementById("periodicite-erreur")
    let SelectedOption = Periodicite.value
    

    if (!arr.includes(SelectedOption)) {
        PeriodiciteErreur.textContent = "la valeur selecter n'est pas valide!"
        PeriodiciteErreur.classList.remove("hidden")
        event.preventDefault()
        Periodicite.setAttribute('aria-invalid', true)
        Periodicite.setAttribute('aria-describedby', 'date-debut-erreur')
    }
    else {
        PeriodiciteErreur.textContent = ""
        PeriodiciteErreur.classList.add("hidden")
        Periodicite.removeAttribute('aria-invalid')
        Periodicite.removeAttribute('aria-describedby')
    }
}
function ValidateDateField(event)
{
    let Input = document.getElementById('date-debut')
    let erreurP = document.getElementById('date-debut-erreur')

    let todaydate = new Date()
    let InputDate = new Date(Input.value + "T00:00:00")
    todaydate.setHours(0, 0, 0, 0)

    
    if (isNaN(InputDate.getDate()) || InputDate < todaydate) {
        erreurP.textContent = "La date selectionné n'est pas valide!"
        erreurP.classList.remove('hidden')
        Input.setAttribute('aria-invalid', true)
        Input.setAttribute('aria-describedby', 'date-debut-erreur')
        event.preventDefault()
    }
    else
    {
        erreurP.textContent = ""
        erreurP.classList.add('hidden')
        Input.removeAttribute('aria-invalid')
        Input.removeAttribute('aria-describedby')

    }
}

function AjouterParticipant(){
    let participantsliste = document.getElementById('participants-liste')
    let nouveauElement = document.createElement('li')

    let NameInput = document.createElement('input')
    NameInput.id = "participant-" + (ParticipantsCompteur +1)
    NameInput.placeholder = "Prenom"
   Object.assign(NameInput.style, {
        border: 'solid 1px green',
        borderRadius: '10px',
        width: '70%',
        padding: '4px'
    })
   
    
    let RetirerButton = document.createElement('button')
    RetirerButton.type = 'button'
    RetirerButton.textContent = "Retirer"
    RetirerButton.id = "retirer-participant-" + (ParticipantsCompteur +1)
    ParticipantsCompteur++
    Object.assign(RetirerButton.style, {
        border: 'solid 1px green',
        borderRadius: '10px',
        width: '25%',
        color: '#7D0E06',
    })
    RetirerButton.classList.add("hover:bg-gray-200")
    RetirerButton.setAttribute('data-action', 'remove')

    nouveauElement.appendChild(NameInput)
    nouveauElement.appendChild(RetirerButton)
    Object.assign(nouveauElement.style, {
        display: 'flex',
        gap: '20px',
    })

    participantsliste.appendChild(nouveauElement)
    
}

function AjouterParticipantEventHandler(event)
{
    let ParticipantListe = document.getElementById('participants-liste')
    let ParticipantsCount = ParticipantListe.childElementCount
    let ErreurP = document.getElementById('participants-erreur')
    if (ParticipantsCount >= 20) {
        ErreurP.textContent = "Vous n'avez pas le droint de ajouter plus que 20 participant!"
        ErreurP.classList.remove('hidden')
    }
    else
    {
        AjouterParticipant()
        ErreurP.textContent = ''
        ErreurP.classList.add('hidden')
        document.getElementById('participants-compteur').textContent = (ParticipantsCount +1) + " participants"
    }
    

}

function RemoveParticipantEventhandler(event)
{
       const button = event.target.closest("[data-action='remove']");
    let participatsCount = document.getElementById('participants-liste').childElementCount
    let erreurP = document.getElementById('participants-erreur')
    if (!button) {
        return;
    }
    if (participatsCount <= 2) {
        erreurP.textContent = "Vous n'avez pas le droint de retirer moins que 2 participant!"
        erreurP.classList.remove('hidden')
    }
    else {
        const task = button.closest("li");
        task.remove();
        erreurP.textContent = ""
        erreurP.classList.add('hidden')
        document.getElementById('participants-compteur').textContent = (participatsCount - 1) + " participants"
    }
}
    

let ajouter_participannts_button = document.getElementById('ajouter-participant')
ajouter_participannts_button.addEventListener('click', AjouterParticipantEventHandler)
let participantsliste = document.getElementById("participants-liste")
participantsliste.addEventListener("click", RemoveParticipantEventhandler);
AjouterParticipantEventHandler()
AjouterParticipantEventHandler()
AjouterParticipantEventHandler()



