import {Component, OnDestroy} from "@angular/core";
import {RaidDetailService} from "../../service/raid_detail";
import {Subscription} from "rxjs";
import {SelectOption} from "../../../../../../template/input/select_input/domain_value/select_option";
import {HitType} from "../../../../domain_value/hit_type";
import {DetailRow} from "../../domain_value/detail_row";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: "RaidDetailTable",
    templateUrl: "./raid_detail_table.html",
    styleUrls: ["./raid_detail_table.scss"],
})
export class RaidDetailTableComponent implements OnDestroy {

    private subscription_abilities: Subscription;
    private subscription_ability_details: Subscription;

    private ability_details: Array<[number, Array<[HitType, DetailRow]>]> = [];
    abilities: Array<SelectOption> = [];

    current_meter_selection: number = 1;
    current_ability_selection: number = 0;

    constructor(
        private activatedRouteService: ActivatedRoute,
        private raidDetailService: RaidDetailService
    ) {
        this.subscription_abilities = this.raidDetailService.abilities.subscribe(abilities => this.abilities = abilities);
        this.subscription_ability_details = this.raidDetailService.ability_details.subscribe(ability_details => this.ability_details = ability_details);
        this.raidDetailService.select(this.current_meter_selection);

        this.activatedRouteService.firstChild?.paramMap.subscribe(params => {
           this.current_meter_selection = Number(params.get("meter"));
           this.current_ability_selection = Number(params.get("spell_id"));
        });
    }

    ngOnDestroy(): void {
        this.subscription_abilities?.unsubscribe();
        this.subscription_ability_details?.unsubscribe();
    }

    get current_ability_details(): Array<[HitType, DetailRow]> {
        const details = this.ability_details.find(([ability, i_details]) => ability === this.current_ability_selection);
        if (details === undefined)
            return [];
        return details[1];
    }

}
