use crate::modules::instance::domain_value::MetaType;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
pub struct InstanceMeta {
    pub instance_meta_id: u32,
    pub server_id: u32,
    pub start_ts: u64,
    pub end_ts: Option<u64>,
    pub map_id: u16,
    pub expired: Option<u64>,
    pub participants: Vec<u32>,
    pub instance_specific: MetaType,
}
