import {InstanceDataFilter} from "./instance_data_filter";
import {Unit} from "../domain_value/unit";
import {RaidMeterKnecht} from "../module/raid_meter/tool/raid_meter_knecht";
import {RaidGraphKnecht} from "../module/raid_graph/tool/raid_graph_knecht";
import {DataSet} from "../module/raid_graph/domain_value/data_set";
import {HealMode} from "../domain_value/heal_mode";
import {DeathOverviewRow} from "../module/raid_meter/module/deaths_overview/domain_value/death_overview_row";
import {UnAuraOverviewRow} from "../module/raid_meter/module/un_aura_overview/domain_value/un_aura_overview_row";
import {RaidDetailKnecht} from "../module/raid_detail_table/tool/raid_detail_knecht";
import {HitType} from "../domain_value/hit_type";
import {DetailRow} from "../module/raid_detail_table/domain_value/detail_row";
import {RaidEventLogKnecht} from "../module/raid_event_log/tool/raid_event_log_knecht";
import {Event} from "../domain_value/event";
import {KnechtUpdates} from "../domain_value/knecht_updates";

export class Rechenknecht {
    constructor(
        private data_filter: InstanceDataFilter,
        private raid_meter_knecht: RaidMeterKnecht,
        private raid_graph_knecht: RaidGraphKnecht,
        private raid_detail_knecht: RaidDetailKnecht,
        private raid_event_log_knecht: RaidEventLogKnecht
    ) {
    }

    private static send_work_start(): void {
        (self as any).postMessage(["KNECHT_UPDATES", KnechtUpdates.WorkStart]);
    }

    private static send_work_end(): void {
        (self as any).postMessage(["KNECHT_UPDATES", KnechtUpdates.WorkEnd]);
    }

    /*
     * RAID EVENT LOG
     */
    async event_log_melee_damage(inverse: boolean, offset: number = 0, up_to_timestamp: number = 0): Promise<Array<Event>> {
        Rechenknecht.send_work_start();
        const meleeDamageEntries = this.raid_event_log_knecht.get_melee_damage_entries(inverse, offset, up_to_timestamp);
        Rechenknecht.send_work_end();
        return meleeDamageEntries;
    }

    async event_log_spell_damage(inverse: boolean, offset: number = 0, up_to_timestamp: number = 0): Promise<Array<[Event, [boolean, Event]]>> {
        Rechenknecht.send_work_start();
        const spellDamageEntries = this.raid_event_log_knecht.get_spell_damage_entries(inverse, offset, up_to_timestamp);
        Rechenknecht.send_work_end();
        return spellDamageEntries;
    }

    async event_log_heal(inverse: boolean, offset: number = 0, up_to_timestamp: number = 0): Promise<Array<[Event, [boolean, Event]]>> {
        Rechenknecht.send_work_start();
        const healEntries = this.raid_event_log_knecht.get_heal_entries(inverse, offset, up_to_timestamp);
        Rechenknecht.send_work_end();
        return healEntries;
    }

    async event_log_deaths(inverse: boolean, offset: number = 0, up_to_timestamp: number = 0): Promise<Array<Event>> {
        Rechenknecht.send_work_start();
        const deathEntries = this.raid_event_log_knecht.get_death_entries(inverse, offset, up_to_timestamp);
        Rechenknecht.send_work_end();
        return deathEntries;
    }

    /*
     * RAID DETAIL
     */
    async detail_damage(inverse: boolean): Promise<Array<[number, Array<[HitType, DetailRow]>]>> {
        Rechenknecht.send_work_start();
        const detailDamage = this.raid_detail_knecht.damage.calculate(inverse);
        Rechenknecht.send_work_end();
        return detailDamage;
    }

    async detail_heal(heal_mode: HealMode, inverse: boolean): Promise<Array<[number, Array<[HitType, DetailRow]>]>> {
        Rechenknecht.send_work_start();
        const detailHeal = this.raid_detail_knecht.heal.calculate(heal_mode, inverse);
        Rechenknecht.send_work_end();
        return detailHeal;
    }

    async detail_threat(inverse: boolean): Promise<Array<[number, Array<[HitType, DetailRow]>]>> {
        Rechenknecht.send_work_start();
        const detailThreat = this.raid_detail_knecht.threat.calculate(inverse);
        Rechenknecht.send_work_end();
        return detailThreat;
    }

    /*
     * RAID GRAPH
     */
    async graph_data_set(data_set: DataSet): Promise<Array<[number, number]>> {
        Rechenknecht.send_work_start();
        const result = this.raid_graph_knecht.get_data_set(data_set);
        Rechenknecht.send_work_end();
        return result;
    }

    /*
     * RAID METER
     */
    async meter_damage(inverse: boolean): Promise<Array<[number, [Unit, Array<[number, number]>]]>> {
        Rechenknecht.send_work_start();
        const meter_damage = this.raid_meter_knecht.damage.calculate(inverse);
        Rechenknecht.send_work_end();
        return meter_damage;
    }

    async meter_heal(heal_mode: HealMode, inverse: boolean): Promise<Array<[number, [Unit, Array<[number, number]>]]>> {
        Rechenknecht.send_work_start();
        const meter_heal = this.raid_meter_knecht.heal.calculate(heal_mode, inverse);
        Rechenknecht.send_work_end();
        return meter_heal;
    }

    async meter_threat(inverse: boolean): Promise<Array<[number, [Unit, Array<[number, number]>]]>> {
        Rechenknecht.send_work_start();
        const meter_threat = this.raid_meter_knecht.threat.calculate(inverse);
        Rechenknecht.send_work_end();
        return meter_threat;
    }

    async meter_death(inverse: boolean): Promise<Array<[number, [Unit, Array<DeathOverviewRow>]]>> {
        Rechenknecht.send_work_start();
        const meter_death = this.raid_meter_knecht.death.calculate(inverse);
        Rechenknecht.send_work_end();
        return meter_death;
    }

    async meter_dispel(inverse: boolean): Promise<Array<[number, [Unit, Array<UnAuraOverviewRow>]]>> {
        Rechenknecht.send_work_start();
        const meter_dispel = this.raid_meter_knecht.dispel.calculate(inverse);
        Rechenknecht.send_work_end();
        return meter_dispel;
    }

    async meter_interrupt(inverse: boolean): Promise<Array<[number, [Unit, Array<UnAuraOverviewRow>]]>> {
        Rechenknecht.send_work_start();
        const meter_interrupt = this.raid_meter_knecht.interrupt.calculate(inverse);
        Rechenknecht.send_work_end();
        return meter_interrupt;
    }

    async meter_spell_steal(inverse: boolean): Promise<Array<[number, [Unit, Array<UnAuraOverviewRow>]]>> {
        Rechenknecht.send_work_start();
        const meter_spell_steal = this.raid_meter_knecht.spell_steal.calculate(inverse);
        Rechenknecht.send_work_end();
        return meter_spell_steal;
    }

    /*
     * DATA FILTER
     */
    async set_segment_intervals(intervals: Array<[number, number]>): Promise<void> {
        Rechenknecht.send_work_start();
        const segmentIntervals = this.data_filter.set_segment_intervals(intervals);
        Rechenknecht.send_work_end();
        await segmentIntervals;
    }

    async set_source_filter(sources: Array<number>): Promise<void> {
        Rechenknecht.send_work_start();
        const sourceFilter = this.data_filter.set_source_filter(sources);
        Rechenknecht.send_work_end();
        await sourceFilter;
    }

    async set_target_filter(targets: Array<number>): Promise<void> {
        Rechenknecht.send_work_start();
        const targetFilter = this.data_filter.set_target_filter(targets);
        Rechenknecht.send_work_end();
        await targetFilter;
    }

    async set_ability_filter(abilities: Array<number>): Promise<void> {
        Rechenknecht.send_work_start();
        const abilityFilter = this.data_filter.set_ability_filter(abilities);
        Rechenknecht.send_work_end();
        await abilityFilter;
    }

    async get_sources(): Promise<Array<Unit>> {
        Rechenknecht.send_work_start();
        const sources = await this.data_filter.get_sources();
        Rechenknecht.send_work_end();
        return sources;
    }

    async get_targets(): Promise<Array<Unit>> {
        Rechenknecht.send_work_start();
        const targets = await this.data_filter.get_targets();
        Rechenknecht.send_work_end();
        return targets;
    }

    async get_abilities(): Promise<Array<number>> {
        Rechenknecht.send_work_start();
        const abilities = await this.data_filter.get_abilities();
        Rechenknecht.send_work_end();
        return abilities;
    }

    async get_loot(): Promise<Array<Event>> {
        Rechenknecht.send_work_start();
        const loot = this.data_filter.get_loot();
        Rechenknecht.send_work_end();
        return loot;
    }
}

