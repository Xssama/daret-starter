// Daret — simulateur. Ton code commence ici.
// Le HTML (index.html) est déjà intégré : lis-le, repère les id et les data-*, puis fais-le vivre.

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
        Input.setAttribute('aria-invalid', true)
        Input.setAttribute('aria-describedby', 'date-debut-erreur')
    }
    else 
    {
        erreurP.textContent = ""
        erreurP.classList.add('hidden')
        Input.removeAttribute('aria-invalid')
        Input.removeAttribute('aria-describedby')
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
        Input.setAttribute('aria-invalid', true)
        Input.setAttribute('aria-describedby', 'date-debut-erreur')
    }
    else 
    {
        erreurP.textContent = ""
        erreurP.classList.add('hidden')
        Input.removeAttribute('aria-invalid')
        Input.removeAttribute('aria-describedby')
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
        Input.setAttribute('aria-invalid', true)
        Input.setAttribute('aria-describedby', 'date-debut-erreur')
    }
    else {
        PeriodiciteErreur.textContent = ""
        PeriodiciteErreur.classList.add("hidden")
        Input.removeAttribute('aria-invalid')
        Input.removeAttribute('aria-describedby')
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
daret_formulaire.addEventListener('submit', ValidateDateField)
daret_formulaire.addEventListener('submit', ValidateNameField)
daret_formulaire.addEventListener('submit', ValidateCotisationField)
daret_formulaire.addEventListener('submit', ValidatePeriodiciteField)
