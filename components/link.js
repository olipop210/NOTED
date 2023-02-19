//plik juz nieuzywany

const getLink=async function(){
    let link='tu jestem';

    var data ={ 
        Email: 'email', 
        Password: 'haslo'
    };
    
    await fetch('http://popfotografia.j.pl/link.json', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            link = data.link;
        })
        .catch((error) => {
            link = "nie " + error;
            console.log("nie " + error);
        });
        return link;
}

export default getLink;

