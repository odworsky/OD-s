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
                if(this.drug[d] == 'AnyOpioid'){
                    this.drug[d] = 'Opioid'
                }
                if(this.drug[d] == 'Tramad'){
                    this.drug[d] = 'Tramadol'
                }
                if(this.drug[d] == 'Amphet'){
                    this.drug[d] = 'Amphetamine'
                }
                this.drugs.push(this.drug[d])
            }
        }
    }

    getDrug(){
        let d = round(random(0, this.drugs.length))
        return this.drugs[d]
    }

    
}