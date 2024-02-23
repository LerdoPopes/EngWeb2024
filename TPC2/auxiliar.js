exports.myDateTime = () => {
    var d = new Date().toISOString().substring(0,16)
    return d
} 

exports.myName = () => {
    return "Tiago Barata"
}

exports.turma = "EngWeb2024::TP2"