import { Page, routing } from "../ui/navigationTracking";
import { Generic_fromJSON, Generic_toJSON, Reviver } from "../../utils/JSONReviver";

export class GangMember {
    name: string;
    task: string = "Unassigned";

    earnedRespect: number = 0;

    hack: number = 1;
    str: number = 1;
    def: number = 1;
    dex: number = 1;
    agi: number = 1;
    cha: number = 1;

    hack_exp: number = 0;
    str_exp: number = 0;
    def_exp: number = 0;
    dex_exp: number = 0;
    agi_exp: number = 0;
    cha_exp: number = 0;

    hack_mult: number = 1;
    str_mult: number = 1;
    def_mult: number = 1;
    dex_mult: number = 1;
    agi_mult: number = 1;
    cha_mult: number = 1;

    hack_asc_mult: number = 1;
    str_asc_mult: number = 1;
    def_asc_mult: number = 1;
    dex_asc_mult: number = 1;
    agi_asc_mult: number = 1;
    cha_asc_mult: number = 1;

    upgrades: string[] = []; // Names of upgrades
    augmentations: string[] = []; // Names of augmentations only

    constructor(name: string = "") {
        this.name   = name;
    }


    // // Same skill calculation formula as Player
    // calculateSkill(exp: number, mult: number = 1): number {
    //     return Math.max(Math.floor(mult * (32 * Math.log(exp + 534.5) - 200)), 1);
    // }

    // updateSkillLevels(): void {
    //     this.hack   = this.calculateSkill(this.hack_exp, this.hack_mult * this.hack_asc_mult);
    //     this.str    = this.calculateSkill(this.str_exp, this.str_mult * this.str_asc_mult);
    //     this.def    = this.calculateSkill(this.def_exp, this.def_mult * this.def_asc_mult);
    //     this.dex    = this.calculateSkill(this.dex_exp, this.dex_mult * this.dex_asc_mult);
    //     this.agi    = this.calculateSkill(this.agi_exp, this.agi_mult * this.agi_asc_mult);
    //     this.cha    = this.calculateSkill(this.cha_exp, this.cha_mult * this.cha_asc_mult);
    // }

    // calculatePower(): number {
    //     return (this.hack + this.str + this.def + this.dex + this.agi + this.cha) / 95;
    // }

    // assignToTask(taskName: string): boolean {
    //     if (GangMemberTasks.hasOwnProperty(taskName)) {
    //         this.task = taskName;
    //         return true;
    //     } else {
    //         this.task = "Unassigned";
    //         return false;
    //     }
    // }

    // unassignFromTask(): string {
    //     this.task = "Unassigned";
    // }

    // getTask(): string {
    //     // Backwards compatibility
    //     if (this.task instanceof GangMemberTask) {
    //         this.task = this.task.name;
    //     }

    //     if (GangMemberTasks.hasOwnProperty(this.task)) {
    //         return GangMemberTasks[this.task];
    //     }
    //     return GangMemberTasks["Unassigned"];
    // }

    // // Gains are per cycle
    // calculateRespectGain(gang: any): number {
    //     const task = this.getTask();
    //     if (task == null || !(task instanceof GangMemberTask) || task.baseRespect === 0) {return 0;}
    //     let statWeight =    (task.hackWeight/100) * this.hack +
    //                         (task.strWeight/100) * this.str +
    //                         (task.defWeight/100) * this.def +
    //                         (task.dexWeight/100) * this.dex +
    //                         (task.agiWeight/100) * this.agi +
    //                         (task.chaWeight/100) * this.cha;
    //     statWeight -= (4 * task.difficulty);
    //     if (statWeight <= 0) { return 0; }
    //     const territoryMult = Math.pow(AllGangs[gang.facName].territory * 100, task.territory.respect) / 100;
    //     if (isNaN(territoryMult) || territoryMult <= 0) { return 0; }
    //     const respectMult = gang.getWantedPenalty();
    //     return 11 * task.baseRespect * statWeight * territoryMult * respectMult;
    // }

    // calculateWantedLevelGain(gang: any): number {
    //     const task = this.getTask();
    //     if (task == null || !(task instanceof GangMemberTask) || task.baseWanted === 0) { return 0; }
    //     let statWeight = (task.hackWeight / 100) * this.hack +
    //                      (task.strWeight / 100) * this.str +
    //                      (task.defWeight / 100) * this.def +
    //                      (task.dexWeight / 100) * this.dex +
    //                      (task.agiWeight / 100) * this.agi +
    //                      (task.chaWeight / 100) * this.cha;
    //     statWeight -= (3.5 * task.difficulty);
    //     if (statWeight <= 0) { return 0; }
    //     const territoryMult = Math.pow(AllGangs[gang.facName].territory * 100, task.territory.wanted) / 100;
    //     if (isNaN(territoryMult) || territoryMult <= 0) { return 0; }
    //     if (task.baseWanted < 0) {
    //         return 0.4 * task.baseWanted * statWeight * territoryMult;
    //     } else {
    //         const calc = 7 * task.baseWanted / (Math.pow(3 * statWeight * territoryMult, 0.8));

    //         // Put an arbitrary cap on this to prevent wanted level from rising too fast if the
    //         // denominator is very small. Might want to rethink formula later
    //         return Math.min(100, calc);
    //     }
    // }

    // calculateMoneyGain(gang: any): number {
    //     const task = this.getTask();
    //     if (task == null || !(task instanceof GangMemberTask) || task.baseMoney === 0) {return 0;}
    //     let statWeight =    (task.hackWeight/100) * this.hack +
    //                         (task.strWeight/100) * this.str +
    //                         (task.defWeight/100) * this.def +
    //                         (task.dexWeight/100) * this.dex +
    //                         (task.agiWeight/100) * this.agi +
    //                         (task.chaWeight/100) * this.cha;
    //     statWeight -= (3.2 * task.difficulty);
    //     if (statWeight <= 0) { return 0; }
    //     const territoryMult = Math.pow(AllGangs[gang.facName].territory * 100, task.territory.money) / 100;
    //     if (isNaN(territoryMult) || territoryMult <= 0) { return 0; }
    //     const respectMult = gang.getWantedPenalty();
    //     return 5 * task.baseMoney * statWeight * territoryMult * respectMult;
    // }

    // gainExperience(numCycles: number = 1): void {
    //     const task = this.getTask();
    //     if (task == null || !(task instanceof GangMemberTask) || task === GangMemberTasks["Unassigned"]) {return;}
    //     const difficultyMult = Math.pow(task.difficulty, 0.9);
    //     const difficultyPerCycles = difficultyMult * numCycles;
    //     const weightDivisor = 1500;
    //     this.hack_exp   += (task.hackWeight / weightDivisor) * difficultyPerCycles;
    //     this.str_exp    += (task.strWeight / weightDivisor) * difficultyPerCycles;
    //     this.def_exp    += (task.defWeight / weightDivisor) * difficultyPerCycles;
    //     this.dex_exp    += (task.dexWeight / weightDivisor) * difficultyPerCycles;
    //     this.agi_exp    += (task.agiWeight / weightDivisor) * difficultyPerCycles;
    //     this.cha_exp    += (task.chaWeight / weightDivisor) * difficultyPerCycles;
    // }

    // recordEarnedRespect(numCycles: number = 1, gang: any): void {
    //     this.earnedRespect += (this.calculateRespectGain(gang) * numCycles);
    // }

    // ascend(): any {
    //     const res = this.getAscensionResults();
    //     const hackAscMult = res.hack;
    //     const strAscMult =  res.str;
    //     const defAscMult =  res.def;
    //     const dexAscMult =  res.dex;
    //     const agiAscMult =  res.agi;
    //     const chaAscMult =  res.cha;
    //     this.hack_asc_mult += hackAscMult;
    //     this.str_asc_mult += strAscMult;
    //     this.def_asc_mult += defAscMult;
    //     this.dex_asc_mult += dexAscMult;
    //     this.agi_asc_mult += agiAscMult;
    //     this.cha_asc_mult += chaAscMult;

    //     // Remove upgrades. Then re-calculate multipliers and stats
    //     this.upgrades.length = 0;
    //     this.hack_mult = 1;
    //     this.str_mult = 1;
    //     this.def_mult = 1;
    //     this.dex_mult = 1;
    //     this.agi_mult = 1;
    //     this.cha_mult = 1;
    //     for (let i = 0; i < this.augmentations.length; ++i) {
    //         let aug = GangMemberUpgrades[this.augmentations[i]];
    //         aug.apply(this);
    //     }

    //     // Clear exp and recalculate stats
    //     this.hack_exp = 0;
    //     this.str_exp = 0;
    //     this.def_exp = 0;
    //     this.dex_exp = 0;
    //     this.agi_exp = 0;
    //     this.cha_exp = 0;
    //     this.updateSkillLevels();

    //     const respectToDeduct = this.earnedRespect;
    //     this.earnedRespect = 0;
    //     return {
    //         respect: respectToDeduct,
    //         hack: hackAscMult,
    //         str: strAscMult,
    //         def: defAscMult,
    //         dex: dexAscMult,
    //         agi: agiAscMult,
    //         cha: chaAscMult,
    //     };
    // }

    // getAscensionEfficiency(): any {
    //     function formula(mult) {
    //         return 1/(1+Math.log(mult)/Math.log(20));
    //     }
    //     return {
    //         hack: formula(this.hack_asc_mult),
    //         str: formula(this.str_asc_mult),
    //         def: formula(this.def_asc_mult),
    //         dex: formula(this.dex_asc_mult),
    //         agi: formula(this.agi_asc_mult),
    //         cha: formula(this.cha_asc_mult),
    //     };
    // }

    // // Returns the multipliers that would be gained from ascension
    // getAscensionResults(): any {
    //     /**
    //      * Calculate ascension bonus to stat multipliers.
    //      * This is based on the current number of multipliers from Non-Augmentation upgrades
    //      * + Ascension Bonus = N% of current bonus from Augmentations
    //      */
    //     let hack = 1;
    //     let str = 1;
    //     let def = 1;
    //     let dex = 1;
    //     let agi = 1;
    //     let cha = 1;
    //     for (let i = 0; i < this.upgrades.length; ++i) {
    //         const upg = GangMemberUpgrades[this.upgrades[i]];
    //         if (upg.mults.hack != null) { hack *= upg.mults.hack; }
    //         if (upg.mults.str != null)  { str *= upg.mults.str; }
    //         if (upg.mults.def != null)  { def *= upg.mults.def; }
    //         if (upg.mults.dex != null)  { dex *= upg.mults.dex; }
    //         if (upg.mults.agi != null)  { agi *= upg.mults.agi; }
    //         if (upg.mults.cha != null)  { cha *= upg.mults.cha; }
    //     }

    //     // Subtract 1 because we're only interested in the actual "bonus" part
    //     const eff = this.getAscensionEfficiency();
    //     return {
    //         hack: (Math.max(0, hack - 1) * AscensionMultiplierRatio * eff.hack),
    //         str:  (Math.max(0, str - 1) * AscensionMultiplierRatio * eff.str),
    //         def:  (Math.max(0, def - 1) * AscensionMultiplierRatio * eff.def),
    //         dex:  (Math.max(0, dex - 1) * AscensionMultiplierRatio * eff.dex),
    //         agi:  (Math.max(0, agi - 1) * AscensionMultiplierRatio * eff.agi),
    //         cha:  (Math.max(0, cha - 1) * AscensionMultiplierRatio * eff.cha),
    //     }
    // }

    // buyUpgrade(upg: any, player: any, gang: any): boolean {
    //     if (typeof upg === 'string') {
    //         upg = GangMemberUpgrades[upg];
    //     }
    //     if (!(upg instanceof GangMemberUpgrade)) {
    //         return false;
    //     }
    //     // Prevent purchasing of already-owned upgrades
    //     if (this.augmentations.includes(upg.name) || this.upgrades.includes(upg.name)) {
    //         return false;
    //     }

    //     if (player.money.lt(upg.getCost(gang))) { return false; }
    //     player.loseMoney(upg.getCost(gang));
    //     if (upg.type === "g") {
    //         this.augmentations.push(upg.name);
    //     } else {
    //         this.upgrades.push(upg.name);
    //     }
    //     upg.apply(this);
    //     if (routing.isOn(Page.Gang) && UIElems.gangMemberUpgradeBoxOpened) {
    //         var initFilterValue = UIElems.gangMemberUpgradeBoxFilter.value.toString();
    //         gang.createGangMemberUpgradeBox(player, initFilterValue);
    //     }
    //     return true;
    // }

    /**
     * Serialize the current object to a JSON save state.
     */
    toJSON(): any {
        return Generic_toJSON("GangMember", this);
    }

    /**
     * Initiatizes a GangMember object from a JSON save state.
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static fromJSON(value: any): GangMember {
        return Generic_fromJSON(GangMember, value.data);
    }
}

Reviver.constructors.GangMember = GangMember;