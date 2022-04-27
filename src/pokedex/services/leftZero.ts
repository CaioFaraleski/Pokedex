export function leftZeros(num: number, len: number) {
    let numberWithZeroes = String(num);
    let counter = numberWithZeroes.length;
      
  while(counter < len) {
  
      numberWithZeroes = "0" + numberWithZeroes;
    
    counter++;
  
    }
  
  return numberWithZeroes;
}