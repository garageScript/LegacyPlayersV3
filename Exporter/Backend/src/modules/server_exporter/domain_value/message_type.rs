#[derive(Debug, Clone, PartialEq, Eq)]
pub enum MessageType {
    MeleeDamage = 0,
    SpellDamage = 1,
    Heal = 2,
    Death = 3,
    AuraApplication = 4,
    Dispel = 5,
    SpellSteal = 6,
    Interrupt = 7,
    Position = 8,
    CombatState = 9,
    Power = 10,
    Loot = 11,
    SpellCast = 12,
    Threat = 13,
    Event = 14,
    Summon = 15,
    InstancePvpStartUnratedArena = 16,
    InstancePvpStartRatedArena = 17,
    InstancePvpStartBattleground = 18,
    InstancePvpEndUnratedArena = 19,
    InstancePvpEndRatedArena = 20,
    InstancePvpEndBattleground = 21,
    InstanceDeleted = 22,
    Map = 23,
    Undefined = 255,
}

impl MessageType {
    pub fn from_number(number: &u8) -> Self {
        match number {
            0 => MessageType::MeleeDamage,
            1 => MessageType::SpellDamage,
            2 => MessageType::Heal,
            3 => MessageType::Death,
            4 => MessageType::AuraApplication,
            5 => MessageType::Dispel,
            6 => MessageType::SpellSteal,
            7 => MessageType::Interrupt,
            8 => MessageType::Position,
            9 => MessageType::CombatState,
            10 => MessageType::Power,
            11 => MessageType::Loot,
            12 => MessageType::SpellCast,
            13 => MessageType::Threat,
            14 => MessageType::Event,
            15 => MessageType::Summon,
            16 => MessageType::InstancePvpStartUnratedArena,
            17 => MessageType::InstancePvpStartRatedArena,
            18 => MessageType::InstancePvpStartBattleground,
            19 => MessageType::InstancePvpEndUnratedArena,
            20 => MessageType::InstancePvpEndRatedArena,
            21 => MessageType::InstancePvpEndBattleground,
            22 => MessageType::InstanceDeleted,
            23 => MessageType::Map,
            _ => MessageType::Undefined,
        }
    }
}
