// JavaScript’s equality operator (==) coerces or converts its operands, leading to unexpected behavior:
// JavaScript also allows accessing properties which aren’t present:

class JS {
  


    checkVals(x) {
      if ("" == 0) {
        // It is! But why??
        console.log(true);
      }
      if (2 > x > 3) {
        // True for *any* value of x!
        console.log(true);
      }
      else{
        console.log(false);
      }
    
      const obj = { width: 10, height: 15 };
      // Why is this NaN? Spelling is hard!
      const area = obj.width * obj.heigth;

      console.log(obj);

      console.log(area);
     
    }

    
  }
  
  // Create an instance of the JS class
  const jsInstance = new JS();
  
  // Call the checkVals method
  jsInstance.checkVals(5);
  