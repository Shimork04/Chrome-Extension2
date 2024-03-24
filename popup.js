// const btn = document.querySelector(".fetchBtn");
// const titleContainer = document.querySelector(".titleContainer");
// const fetchedTitle = document.getElementById("fetchedTitle");

// btn.addEventListener("click", async ()=>{
//     console.log("Button Clicked");

//     let[tab] = await chrome.tabs.query({active: true, currentWindow: true});
//     console.log(tab);

//     chrome.scripting.executeScript(
//         {
//             target: {tabId : tab.id},
//             fucntion: fetchText,
//         },

//         async (injectionResults) => {
//             console.log(injectionResults);
//             const [data] = injectionResults;

//             if(data.result){
//                 const dataa = data.result;
//                 fetchedTitle.innerText = dataa;


//                 try{
//                     await navigator.clipboard.writeText(dataa);
//                 }
//                 catch(err){
//                     console.log(err);
//                 }
//             }
//             else {
//                 alert("Failed to fetch Title!")
//             }
//         }

//     )
    
// });

// async function  fetchText(){
//     console.group("Script working correctly");
//     try{
//         const  data = await fetch("https://api.quotable.io/random")
//         .then((res) => res.json());
        
//         if(!data){
//             throw new Error('No Data');
//         }
//     }
//     catch(err){
//         console.log(err);
//     }

// }

const btn = document.querySelector(".fetchBtn");
const titleContainer = document.querySelector(".titleContainer");
const fetchedTitle = document.querySelector(".fetchedTitle");

btn.addEventListener("click", async () => {
    console.log("Button Clicked");

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log(tab);

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: fetchText,
    }, async (injectionResults) => {
        console.log(injectionResults);
        const [data] = injectionResults;

        if (data.result) {
            const dataa = data.result;
            fetchedTitle.innerText = dataa;
            fetchedTitle.innerHTML = "Title of Page is:  " + " ' " + dataa + " ' ";

            try {
                await navigator.clipboard.writeText(dataa);
                console.log("Text copied to clipboard successfully");
            } catch (err) {
                console.error("Failed to copy text to clipboard:", err);
            }
        } else {
            alert("Failed to fetch Title!");
        }
    });
});

async function fetchText() {
    console.log("Script working correctly");
    try {
        const title = document.title;
        return title;
    } catch (err) {
        console.error("Error fetching text:", err);
        return null;
    }
}
