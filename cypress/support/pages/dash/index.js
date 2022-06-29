/// <reference types="cypress" />

import {el} from './elements'
import header from '../../components/heder'

class DashPage{

    constructor(){
        this.header = header
    }
    
}

export default new DashPage()