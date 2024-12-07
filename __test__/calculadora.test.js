import {describe, expect, jest} from '@jest/globals'

describe('Test Calculadora', ()=>{
    const number1 = 1;
    const number2 = 2;

    it('Deberia poder sumar los muneros y obtener el resultado de la suma', ()=>{
        //Act && Assert
        expect(number1+number2).toBe(3);
    })
})