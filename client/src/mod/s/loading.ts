
export class Loading {

    main = document.readyState === "complete";

    constructor() {

        this.main && this.remove_status();

    }

    remove_status() {

        document.querySelector("#status")?.remove();

    }

    

}