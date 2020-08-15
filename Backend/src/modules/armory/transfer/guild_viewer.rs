use rocket::State;
use rocket_contrib::json::Json;

use crate::modules::{
    armory::{
        dto::{ArmoryFailure, GuildViewerDto},
        tools::{GetGuild, GuildViewer},
        Armory,
    },
    data::{guard::Language, tools::RetrieveServer, Data},
};

#[openapi]
#[get("/guild_viewer/<server_name>/<guild_name>")]
pub fn get_guild_view(me: State<Armory>, data: State<Data>, language: Language, server_name: String, guild_name: String) -> Result<Json<GuildViewerDto>, ArmoryFailure> {
    data.get_server_by_name(server_name).ok_or(ArmoryFailure::InvalidInput).and_then(|server| {
        me.get_guild_by_name(server.id, guild_name)
            .ok_or(ArmoryFailure::InvalidInput)
            .and_then(|guild| me.get_guild_view(&data, language.0, guild.id).map(Json))
    })
}
