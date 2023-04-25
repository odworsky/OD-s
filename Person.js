class Person {
    constructor(n){
        this.old = n
        this.drug = []
        this.percent = []
        this.drugs = []
    }


    fillDrugs(){
        for(let d = 1; d<this.drug.length; d++){
            let p = this.percent[d]
            for(let i = 0; i<round(p); i++){
                this.drugs.push(this.drug[d])
            }
        }
    }

    getDrug(){
        let d = round(random(0, this.drugs.length-1))
        if(this.drugs[d] == 'AnyOpioid'){
            this.drugs[d] = 'Opioid'
        }
        if(this.drugs[d] == 'Tramad'){
            this.drugs[d] = 'Tramadol'
        }
        if(this.drugs[d] == 'Amphet'){
            this.drugs[d] = 'Amphetamine'
        }
        return this.drugs[d]
    }
    
}