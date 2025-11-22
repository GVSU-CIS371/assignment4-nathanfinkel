import { defineStore } from "pinia";
import {
  BaseBeverageType,
  CreamerType,
  SyrupType,
  BeverageType,
} from "../types/beverage";
import tempretures from "../data/tempretures.json";
import db from "../firebase.ts";
import {
  collection,
  getDocs,
  QuerySnapshot,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { addDoc } from "firebase/firestore";

export const useBeverageStore = defineStore("BeverageStore", {
  state: () => ({
    temps: tempretures,
    currentTemp: tempretures[0],
    bases: [] as BaseBeverageType[],
    currentBase: null as BaseBeverageType | null,
    syrups: [] as SyrupType[],
    currentSyrup: null as SyrupType | null,
    creamers: [] as CreamerType[],
    currentCreamer: null as CreamerType | null,
    beverages: [] as BeverageType[],
    currentBeverage: null as BeverageType | null,
    currentName: "",
  }),

  actions: {
    init() {
      getDocs(collection(db, "beverages")).then((qs: QuerySnapshot) => {
        this.beverages = [];
        qs.forEach((qd: QueryDocumentSnapshot) => {
          const bev = qd.data() as BeverageType;
          this.beverages.push(bev);
        });
          
        });
      getDocs(collection(db, "bases")).then((qs: QuerySnapshot) => {
        this.bases = [];
        qs.forEach((qd: QueryDocumentSnapshot) => {
          const basedata = qd.data() as BaseBeverageType;
          this.bases.push(basedata);
        });
        this.currentBase = this.bases[0];
        });
      getDocs(collection(db, "syrups")).then((qs: QuerySnapshot) => {
        this.syrups = [];
        qs.forEach((qd: QueryDocumentSnapshot) => {
          const syrupdata = qd.data() as SyrupType;
          this.syrups.push(syrupdata);
        });
        this.currentSyrup = this.syrups[0];
        });
      getDocs(collection(db, "creamers")).then((qs: QuerySnapshot) => {
        this.creamers = [];
        qs.forEach((qd: QueryDocumentSnapshot) => {
          const creamerdata = qd.data() as CreamerType;
          this.creamers.push(creamerdata);
        });
        this.currentCreamer = this.creamers[0];
        });
      
      },
    
      makeBeverage() {
        const newBeverage: BeverageType = {
          id: this.currentName,
          name: this.currentName,
          base: this.currentBase!,
          syrup: this.currentSyrup!,
          creamer: this.currentCreamer!,
          temp : this.currentTemp,
        };
        addDoc(collection(db, "beverages"), newBeverage).then(() => {
          this.beverages.push(newBeverage);
        });

      },

    showBeverage(bev: BeverageType) {
      this.currentName = bev.name;
      this.currentBeverage = bev
      this.currentBase = bev.base;
      this.currentSyrup = bev.syrup;
      this.currentCreamer = bev.creamer;
      this.currentTemp = bev.temp;
    },
      },
});
