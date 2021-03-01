/** Imprime no console uma mensagem de error bonitinha */
export function printError(title: string, error: any){
    console.log(`---- ${title} ----`)
    console.log(error)
    console.log("--------------------------------")
}