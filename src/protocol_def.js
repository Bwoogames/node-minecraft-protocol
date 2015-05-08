module.exports= {
    handshaking: {
        toClient: {},
        toServer: {
            set_protocol:          {id: 0x00, fields: [
                { name: "protocolVersion", type: "varint" },
                { name: "serverHost", type: "string" },
                { name: "serverPort", type: "ushort" },
                { name: "nextState", type: "varint" }
            ]}
        },
    },

// TODO : protocollib names aren't the best around here
    status: {
        toClient: {
            server_info:    {id: 0x00, fields: [
                { name: "response", type: "ustring" }
            ]},
            ping:        {id: 0x01, fields: [
                { name: "time", type: "long" }
            ]}
        },
        toServer: {
            ping_start:     {id: 0x00, fields: []},
            ping:        {id: 0x01, fields: [
                { name: "time", type: "long" }
            ]}
        }
    },

    login: {
        toClient: {
            disconnect:   {id: 0x00, fields: [
                { name: "reason", type: "string" }
            ]},
            encryption_begin: {id: 0x01, fields: [
                { name: "serverId", type: "string" },
                { name: "publicKeyLength", type: "count", typeArgs: { type: "varint", countFor: "publicKey" } },
                { name: "publicKey", type: "buffer", typeArgs: { count: "publicKeyLength" } },
                { name: "verifyTokenLength", type: "count", typeArgs: { type: "varint", countFor: "verifyToken" } },
                { name: "verifyToken", type: "buffer", typeArgs: { count: "verifyTokenLength" } },
            ]},
            success:      {id: 0x02, fields: [
                { name: "uuid", type: "string" },
                { name: "username", type: "string" }
            ]},
            compress: { id: 0x03, fields: [
                { name: "threshold", type: "varint"}
            ]}
        },
        toServer: {
            login_start:        {id: 0x00, fields: [
                { name: "username", type: "string" }
            ]},
            encryption_begin: {id: 0x01, fields: [
                { name: "sharedSecretLength", type: "count", typeArgs: { type: "varint", countFor: "sharedSecret" } },
                { name: "sharedSecret", type: "buffer", typeArgs: { count: "sharedSecretLength" } },
                { name: "verifyTokenLength", type: "count", typeArgs: { type: "varint", countFor: "verifyToken" } },
                { name: "verifyToken", type: "buffer", typeArgs: { count: "verifyTokenLength" } },
            ]}
        }
    },

    play: {
        toClient: {
            keep_alive:         {id: 0x00, fields: [
                { name: "keepAliveId", type: "varint" },
            ]},
            login:          {id: 0x01, fields: [
                { name: "entityId", type: "int" },
                { name: "gameMode", type: "ubyte" },
                { name: "dimension", type: "byte" },
                { name: "difficulty", type: "ubyte" },
                { name: "maxPlayers", type: "ubyte" },
                { name: "levelType", type: "string" },
                { name: "reducedDebugInfo", type: "bool"}
            ]},
            chat:               {id: 0x02, fields: [
                { name: "message", type: "ustring" },
                { name: "position", type: "byte" }
            ]},
            update_time:        {id: 0x03, fields: [
                { name: "age", type: "long" },
                { name: "time", type: "long" },
            ]},
            entity_equipment:   {id: 0x04, fields: [
                { name: "entityId", type: "varint" },
                { name: "slot", type: "short" },
                { name: "item", type: "slot" }
            ]},
            spawn_position:     {id: 0x05, fields: [
                { name: "location", type: "position" } /* TODO: Implement position */
            ]},
            update_health:      {id: 0x06, fields: [
                { name: "health", type: "float" },
                { name: "food", type: "varint" },
                { name: "foodSaturation", type: "float" }
            ]},
            respawn:            {id: 0x07, fields: [
                { name: "dimension", type: "int" },
                { name: "difficulty", type: "ubyte" },
                { name: "gamemode", type: "ubyte" },
                { name: "levelType", type: "string" }
            ]},
            position:    {id: 0x08, fields: [
                { name: "x", type: "double" },
                { name: "y", type: "double" },
                { name: "z", type: "double" },
                { name: "yaw", type: "float" },
                { name: "pitch", type: "float" },
                { name: "flags", type: "byte" /* <Dinnerbone> It's a bitfield, X/Y/Z/Y_ROT/X_ROT. If X is set, the x value is relative and not absolute. */}
            ]},
            held_item_slot:   {id: 0x09, fields: [
                { name: "slot", type: "byte" }
            ]},
            bed:            {id: 0x0a, fields: [
                { name: "entityId", type: "varint" },
                { name: "location", type: "position" }
            ]},
            animation:          {id: 0x0b, fields: [
                { name: "entityId", type: "varint" },
                { name: "animation", type: "ubyte" }
            ]},
            named_entity_spawn:       {id: 0x0c, fields: [
                { name: "entityId", type: "varint" },
                { name: "playerUUID", type: "UUID"},
                { name: "x", type: "int" },
                { name: "y", type: "int" },
                { name: "z", type: "int" },
                { name: "yaw", type: "byte" },
                { name: "pitch", type: "byte" },
                { name: "currentItem", type: "short" },
                { name: "metadata", type: "entityMetadata" }
            ]},
            collect:       {id: 0x0d, fields: [
                { name: "collectedEntityId", type: "varint" },
                { name: "collectorEntityId", type: "varint" }
            ]},
            spawn_entity:       {id: 0x0e, fields: [
                { name: "entityId", type: "varint" },
                { name: "type", type: "byte" },
                { name: "x", type: "int" },
                { name: "y", type: "int" },
                { name: "z", type: "int" },
                { name: "pitch", type: "byte" },
                { name: "yaw", type: "byte" },
                { name: "objectData", type: "container", typeArgs: { fields: [
                    { name: "intField", type: "int" },
                    { name: "velocityX", type: "short", condition: {"field":"intField","values":[0],"different":true,"this":true}},
                    { name: "velocityY", type: "short", condition: {"field":"intField","values":[0],"different":true,"this":true}},
                    { name: "velocityZ", type: "short", condition: {"field":"intField","values":[0],"different":true,"this":true}}
                ]}}
            ]},
            spawn_entity_living:          {id: 0x0f, fields: [
                { name: "entityId", type: "varint" },
                { name: "type", type: "ubyte" },
                { name: "x", type: "int" },
                { name: "y", type: "int" },
                { name: "z", type: "int" },
                { name: "yaw", type: "byte" },
                { name: "pitch", type: "byte" },
                { name: "headPitch", type: "byte" },
                { name: "velocityX", type: "short" },
                { name: "velocityY", type: "short" },
                { name: "velocityZ", type: "short" },
                { name: "metadata", type: "entityMetadata" },
            ]},
            spawn_entity_painting:     {id: 0x10, fields: [
                { name: "entityId", type: "varint" },
                { name: "title", type: "string" },
                { name: "location", type: "position" },
                { name: "direction", type: "ubyte" }
            ]},
            spawn_entity_experience_orb: {id: 0x11, fields: [
                { name: "entityId", type: "varint" },
                { name: "x", type: "int" },
                { name: "y", type: "int" },
                { name: "z", type: "int" },
                { name: "count", type: "short" }
            ]},
            entity_velocity:    {id: 0x12, fields: [
                { name: "entityId", type: "varint" },
                { name: "velocityX", type: "short" },
                { name: "velocityY", type: "short" },
                { name: "velocityZ", type: "short" }
            ]},
            entity_destroy:   {id: 0x13, fields: [
                { name: "count", type: "count", typeArgs: { type: "varint", countFor: "entityIds" } },
                { name: "entityIds", type: "array", typeArgs: { type: "varint", count: "count" } }
            ]},
            entity:             {id: 0x14, fields: [
                { name: "entityId", type: "varint" }
            ]},
            rel_entity_move: {id: 0x15, fields: [
                { name: "entityId", type: "varint" },
                { name: "dX", type: "byte" },
                { name: "dY", type: "byte" },
                { name: "dZ", type: "byte" },
                { name: "onGround", type: "bool"}
            ]},
            entity_look:        {id: 0x16, fields: [
                { name: "entityId", type: "varint" },
                { name: "yaw", type: "byte" },
                { name: "pitch", type: "byte" },
                { name: "onGround", type: "bool"}
            ]},
            entity_move_look: {id: 0x17, fields: [
                { name: "entityId", type: "varint" },
                { name: "dX", type: "byte" },
                { name: "dY", type: "byte" },
                { name: "dZ", type: "byte" },
                { name: "yaw", type: "byte" },
                { name: "pitch", type: "byte" },
                { name: "onGround", type: "bool"}
            ]},
            entity_teleport:    {id: 0x18, fields: [
                { name: "entityId", type: "varint" },
                { name: "x", type: "int" },
                { name: "y", type: "int" },
                { name: "z", type: "int" },
                { name: "yaw", type: "byte" },
                { name: "pitch", type: "byte" },
                { name: "onGround", type: "bool"}
            ]},
            entity_head_rotation:   {id: 0x19, fields: [
                { name: "entityId", type: "varint" },
                { name: "headYaw", type: "byte" },
            ]},
            entity_status:      {id: 0x1a, fields: [
                { name: "entityId", type: "int" },
                { name: "entityStatus", type: "byte" }
            ]},
            attach_entity:      {id: 0x1b, fields: [
                { name: "entityId", type: "int" },
                { name: "vehicleId", type: "int" },
                { name: "leash", type: "bool" }
            ]},
            entity_metadata:    {id: 0x1c, fields: [
                { name: "entityId", type: "varint" },
                { name: "metadata", type: "entityMetadata" }
            ]},
            entity_effect:      {id: 0x1d, fields: [
                { name: "entityId", type: "varint" },
                { name: "effectId", type: "byte" },
                { name: "amplifier", type: "byte" },
                { name: "duration", type: "varint" },
                { name: "hideParticles", type: "bool" }
            ]},
            remove_entity_effect: {id: 0x1e, fields: [
                { name: "entityId", type: "varint" },
                { name: "effectId", type: "byte" }
            ]},
            experience:     {id: 0x1f, fields: [
                { name: "experienceBar", type: "float" },
                { name: "level", type: "varint" },
                { name: "totalExperience", type: "varint" }
            ]},
            update_attributes:  {id: 0x20, fields: [
                { name: "entityId", type: "varint" },
                { name: "count", type: "count", typeArgs: { type: "int", countFor: "properties" } },
                { name: "properties", type: "array", typeArgs: { count: "count",
                    type: "container", typeArgs: { fields: [
                        { name: "key", type: "string" },
                        { name: "value", type: "double" },
                        { name: "listLength", type: "count", typeArgs: { type: "varint", countFor: "this.modifiers" } },
                        { name: "modifiers", type: "array", typeArgs: { count: "this.listLength",
                            type: "container", typeArgs: { fields: [
                                { name: "UUID", type: "UUID" },
                                { name: "amount", type: "double" },
                                { name: "operation", type: "byte" }
                            ]}}}
                    ]}
                }}
            ]},
            map_chunk:         {id: 0x21, fields: [
                { name: "x", type: "int" },
                { name: "z", type: "int" },
                { name: "groundUp", type: "bool" },
                { name: "bitMap", type: "ushort" },
                { name: "chunkDataLength", type: "count", typeArgs: { type: "varint", countFor: "chunkData" } },
                { name: "chunkData", type: "buffer", typeArgs: { count: "chunkDataLength" } },
            ]},
            multi_block_change: {id: 0x22, fields: [
                { name: "chunkX", type: "int" },
                { name: "chunkZ", type: "int" },
                { name: "recordCount", type: "count", typeArgs: { type: "varint", countFor: "records" } },
                { name: "records", type: "array", typeArgs: { count: "recordCount", type: "container", typeArgs: { fields: [
                    { name: "horizontalPos", type: "ubyte" },
                    { name: "y", type: "ubyte" },
                    { name: "blockId", type: "varint" }
                ]}}}
            ]},
            block_change:       {id: 0x23, fields: [
                { name: "location", type: "position" },
                { name: "type", type: "varint" },
            ]},
            block_action:       {id: 0x24, fields: [
                { name: "location", type: "position" },
                { name: "byte1", type: "ubyte" },
                { name: "byte2", type: "ubyte" },
                { name: "blockId", type: "varint" }
            ]},
            block_break_animation:   {id: 0x25, fields: [
                { name: "entityId", type: "varint" },
                { name: "location", type: "position" },
                { name: "destroyStage", type: "byte" }
            ]},
            map_chunk_bulk: {id: 0x26, fields: [
                { name: "skyLightSent", type: "bool" },
                { name: "chunkColumnCount", type: "count", typeArgs: { type: "varint", countFor: "meta" } },
                { name: "meta", type: "array", typeArgs: { count: "chunkColumnCount", type: "container", typeArgs: { fields: [
                    { name: "x", type: "int" },
                    { name: "z", type: "int" },
                    { name: "bitMap", type: "ushort" },
                ]}}},
                { name: "data", type: "restBuffer" }
            ]},
            explosion: {id: 0x27, fields: [
                { name: "x", type: "float" },
                { name: "y", type: "float" },
                { name: "z", type: "float" },
                { name: "radius", type: "float" },
                { name: "count", type: "count", typeArgs: { type: "int", countFor: "affectedBlockOffsets" } },
                { name: "affectedBlockOffsets", type: "array", typeArgs: { count: "count", type: "container", typeArgs: {
                    fields: [
                        { name: "x", type: "byte" },
                        { name: "y", type: "byte" },
                        { name: "z", type: "byte" }
                    ]
                }}},
                { name: "playerMotionX", type: "float" },
                { name: "playerMotionY", type: "float" },
                { name: "playerMotionZ", type: "float" }
            ]},
            world_event:             {id: 0x28, fields: [ // TODO : kinda wtf naming there
                { name: "effectId", type: "int" },
                { name: "location", type: "position" },
                { name: "data", type: "int" },
                { name: "global", type: "bool" }
            ]},
            named_sound_effect:       {id: 0x29, fields: [
                { name: "soundName", type: "string" },
                { name: "x", type: "int" },
                { name: "y", type: "int" },
                { name: "z", type: "int" },
                { name: "volume", type: "float" },
                { name: "pitch", type: "ubyte" }
            ]},
            world_particles:           {id: 0x2a, fields: [
                { name: "particleId", type: "int" },
                { name: "longDistance", type: "bool"},
                { name: "x", type: "float" },
                { name: "y", type: "float" },
                { name: "z", type: "float" },
                { name: "offsetX", type: "float" },
                { name: "offsetY", type: "float" },
                { name: "offsetZ", type: "float" },
                { name: "particleData", type: "float" },
                { name: "particles", type: "int" },
                { name: "data", type: "array", typeArgs: { count: function(fields) {
                    if (fields.particleId === 36)
                        return 2;
                    else if (fields.particleId === 37 || fields.particleId === 38)
                        return 1;
                    else
                        return 0;
                }, type: "varint" } }
            ]},
            game_state_change:  {id: 0x2b, fields: [
                { name: "reason", type: "ubyte" },
                { name: "gameMode", type: "float" }
            ]},
            spawn_entity_weather:{id: 0x2c, fields: [
                { name: "entityId", type: "varint" },
                { name: "type", type: "byte" },
                { name: "x", type: "int" },
                { name: "y", type: "int" },
                { name: "z", type: "int" }
            ]},
            open_window:        {id: 0x2d, fields: [
                { name: "windowId", type: "ubyte" },
                { name: "inventoryType", type: "string" },
                { name: "windowTitle", type: "string" },
                { name: "slotCount", type: "ubyte" },
                { name: "entityId", type: "int", condition: {"field":"inventoryType","values":[11]}}
            ]},
            close_window:       {id: 0x2e, fields: [
                { name: "windowId", type: "ubyte" }
            ]},
            set_slot:           {id: 0x2f, fields: [
                { name: "windowId", type: "byte" },
                { name: "slot", type: "short" },
                { name: "item", type: "slot" }
            ]},
            window_items:       {id: 0x30, fields: [
                { name: "windowId", type: "ubyte" },
                { name: "count", type: "count", typeArgs: { type: "short", countFor: "items" } },
                { name: "items", type: "array", typeArgs: { type: "slot", count: "count" } }
            ]},
            craft_progress_bar:    {id: 0x31, fields: [ /* TODO: Bad name for this packet imo */
                { name: "windowId", type: "ubyte" },
                { name: "property", type: "short" },
                { name: "value", type: "short" }
            ]},
            transaction:{id: 0x32, fields: [
                { name: "windowId", type: "byte" },
                { name: "action", type: "short" },
                { name: "accepted", type: "bool" }
            ]},
            update_sign:        {id: 0x33, fields: [
                { name: "location", type: "position" },
                { name: "text1", type: "string" },
                { name: "text2", type: "string" },
                { name: "text3", type: "string" },
                { name: "text4", type: "string" }
            ]},
            map: {id: 0x34, fields: [
                { name: "itemDamage", type: "varint" },
                { name: "scale", type: "byte" },
                { name: "iconLength", type: "count", typeArgs: { type: "varint", countFor: "icons" } },
                { name: "icons", type: "array", typeArgs: { count: "iconLength", type: "container", typeArgs: { fields: [
                    { name: "directionAndType", type: "byte" }, // Yeah... that will do
                    { name: "x", type: "byte" },
                    { name: "y", type: "byte" }
                ]}}},
                { name: "columns", type: "byte" },
                { name: "rows", type: "byte", condition: {"field":"columns","values":[0],"different":true}},
                { name: "x", type: "byte", condition: {"field":"columns","values":[0],"different":true}},
                { name: "y", type: "byte", condition: {"field":"columns","values":[0],"different":true}},
                { name: "dataLength", type: "count", typeArgs: { countFor: "data", type: "varint" }, condition: {"field":"columns","values":[0],"different":true}},
                { name: "data", type: "buffer", typeArgs: { count: "dataLength" }, condition: {"field":"columns","values":[0],"different":true}},
            ]},
            tile_entity_data:{id: 0x35, fields: [
                { name: "location", type: "position" },
                { name: "action", type: "ubyte" },
                { name: "nbtData", type: "restBuffer" }
            ]},
            open_sign_entity:   {id: 0x36, fields: [
                { name: "location", type: "position" },
            ]},
            statistics:         {id: 0x37, fields: [
                { name: "count", type: "count", typeArgs: { type: "varint", countFor: "entries" } },
                { name: "entries", type: "array", typeArgs: { count: "count",
                    type: "container", typeArgs: { fields: [
                        { name: "name", type: "string" },
                        { name: "value", type: "varint" }
                    ]}
                }}
            ]},
            player_info: {id: 0x38, fields: [
                { name: "action", type: "varint" },
                { name: "length", type: "count", typeArgs: { type: "varint", countFor: "data" }},
                { name: "data", type: "array", typeArgs: { count: "length", type: "container", typeArgs: { fields: [
                    { name: "UUID", type: "UUID" },
                    { name: "name", type: "string", condition: {"field":"action","values":[0]}},
                    { name: "propertiesLength", type: "count", condition: {"field":"action","values":[0]}
                        , typeArgs: { countFor: "this.properties", type: "varint" }},
                    { name: "properties", type: "array", condition: {"field":"action","values":[0]}
                        , typeArgs: { count: "this.propertiesLength", type: "container", typeArgs: { fields: [
                        { name: "name", type: "string" },
                        { name: "value", type: "ustring" },
                        { name: "isSigned", type: "bool" },
                        { name: "signature", type: "ustring", condition: {"field":"isSigned","values":[true],"this":true}}
                    ]}}},
                    { name: "gamemode", type: "varint", condition: {"field":"action","values":[0,1]}},
                    { name: "ping", type: "varint", condition: {"field":"action","values":[0,2]}},
                    { name: "hasDisplayName", type: "bool", condition: {"field":"action","values":[0,3]}},
                    { name: "displayName", type: "string", condition: {"field":"hasDisplayName","values":[true]}}
                ]}}}
            ]},
            abilities:   {id: 0x39, fields: [
                { name: "flags", type: "byte" },
                { name: "flyingSpeed", type: "float" },
                { name: "walkingSpeed", type: "float" }
            ]},
            tab_complete:       {id: 0x3a, fields: [
                { name: "count", type: "count", typeArgs: { type: "varint", countFor: "matches" } },
                { name: "matches", type: "array", typeArgs: { type: "string", count: "count" } }
            ]},
            scoreboard_objective: {id: 0x3b, fields: [
                { name: "name", type: "string" },
                { name: "action", type: "byte" },
                { name: "displayText", type: "string", condition: {"field":"action","values":[0,2]}},
                { name: "type", type: "string", condition: {"field":"action","values":[0,2]}}
            ]},
            scoreboard_score:       {id: 0x3c, fields: [ /* TODO: itemName and scoreName may need to be switched */
                { name: "itemName", type: "string" },
                { name: "action", type: "byte" },
                { name: "scoreName", type: "string" },
                { name: "value", type: "varint", condition: {"field":"action","values":[1],"different":true}}
            ]},
            scoreboard_display_objective: {id: 0x3d, fields: [
                { name: "position", type: "byte" },
                { name: "name", type: "string" }
            ]},
            scoreboard_team:              {id: 0x3e, fields: [
                { name: "team", type: "string" },
                { name: "mode", type: "byte" },
                { name: "name", type: "string", condition: {"field":"mode","values":[0,2]}},
                { name: "prefix", type: "string", condition: {"field":"mode","values":[0,2]}},
                { name: "suffix", type: "string", condition: {"field":"mode","values":[0,2]}},
                { name: "friendlyFire", type: "byte", condition: {"field":"mode","values":[0,2]}},
                { name: "nameTagVisibility", type: "string", condition: {"field":"mode","values":[0,2]}},
                { name: "color", type: "byte", condition: {"field":"mode","values":[0,2]}},
                { name: "playerCount", type: "count", condition: {"field":"mode","values":[0,3,4]}, typeArgs: { type: "short", countFor: "players" } },
                { name: "players", type: "array", condition: {"field":"mode","values":[0,3,4]}, typeArgs: { type: "string", count: "playerCount" } }
            ]},
            custom_payload:     {id: 0x3f, fields: [
                { name: "channel", type: "string" },
                { name: "data", type: "restBuffer" }
            ]},
            kick_disconnect:         {id: 0x40, fields: [
                { name: "reason", type: "string" }
            ]},
            difficulty: { id: 0x41, fields: [
                { name: "difficulty", type: "ubyte" }
            ]},
            combat_event: { id: 0x42, fields: [
                { name: "event", type: "varint"},
                { name: "duration", type: "varint", condition: {"field":"event","values":[1]}},
                { name: "playerId", type: "varint", condition: {"field":"event","values":[2]}},
                { name: "entityId", type: "int", condition: {"field":"event","values":[1,2]}},
                { name: "message", type: "string", condition: {"field":"event","values":[2]}}
            ]},
            camera: { id: 0x43, fields: [
                { name: "cameraId", type: "varint" }
            ]},
            world_border: { id: 0x44, fields: [
                { name: "action", type: "varint"},
                { name: "radius", type: "double", condition: {"field":"action","values":[0]}},
                { name: "x", type: "double", condition: {"field":"action","values":[2,3]}},
                { name: "z", type: "double", condition: {"field":"action","values":[2,3]}},
                { name: "old_radius", type: "double", condition: {"field":"action","values":[1,3]}},
                { name: "new_radius", type: "double", condition: {"field":"action","values":[1,3]}},
                { name: "speed", type: "varint", condition: {"field":"action","values":[1,3]}},
                { name: "portalBoundary", type: "varint", condition: {"field":"action","values":[3]}},
                { name: "warning_time", type: "varint", condition: {"field":"action","values":[4,3]}},
                { name: "warning_blocks", type: "varint", condition: {"field":"action","values":[5,3]}}
            ]},
            title: { id: 0x45, fields: [
                { name: "action", type: "varint"},
                { name: "text", type: "string", condition: {"field":"action","values":[0,1]}},
                { name: "fadeIn", type: "int", condition: {"field":"action","values":[2]}},
                { name: "stay", type: "int", condition: {"field":"action","values":[2]}},
                { name: "fadeOut", type: "int", condition: {"field":"action","values":[2]}}
            ]},
            set_compression: { id: 0x46, fields: [
                { name: "threshold", type: "varint"}
            ]},
            playerlist_header: { id: 0x47, fields: [
                { name: "header", type: "string" },
                { name: "footer", type: "string" }
            ]},
            resource_pack_send: { id: 0x48, fields: [
                { name: "url", type: "string" },
                { name: "hash", type: "string" }
            ]},
            update_entity_nbt: { id: 0x49, fields: [
                { name: "entityId", type: "varint" },
                { name: "tag", type: "restBuffer"}
            ]}
        },
        toServer: {
            keep_alive:         {id: 0x00, fields: [
                { name: "keepAliveId", type: "varint" }
            ]},
            chat:       {id: 0x01, fields: [
                { name: "message", type: "string" }
            ]},
            use_entity:         {id: 0x02, fields: [
                { name: "target", type: "varint" },
                { name: "mouse", type: "varint" },
                { name: "x", type: "float", condition: {"field":"mouse","values":[2]}},
                { name: "y", type: "float", condition: {"field":"mouse","values":[2]}},
                { name: "z", type: "float", condition: {"field":"mouse","values":[2]}},
            ]},
            flying:             {id: 0x03, fields: [
                { name: "onGround", type: "bool" }
            ]},
            position:    {id: 0x04, fields: [
                { name: "x", type: "double" },
                { name: "y", type: "double" },
                { name: "z", type: "double" },
                { name: "onGround", type: "bool" }
            ]},
            look:        {id: 0x05, fields: [
                { name: "yaw", type: "float" },
                { name: "pitch", type: "float" },
                { name: "onGround", type: "bool" }
            ]},
            position_look: {id: 0x06, fields: [
                { name: "x", type: "double" },
                { name: "y", type: "double" },
                { name: "z", type: "double" },
                { name: "yaw", type: "float" },
                { name: "pitch", type: "float" },
                { name: "onGround", type: "bool" }
            ]},
            block_dig:     {id: 0x07, fields: [
                { name: "status", type: "byte" },
                { name: "location", type: "position"},
                { name: "face", type: "byte" }
            ]},
            block_place: {id: 0x08, fields: [
                { name: "location", type: "position" },
                { name: "direction", type: "byte" },
                { name: "heldItem", type: "slot" },
                { name: "cursorX", type: "byte" },
                { name: "cursorY", type: "byte" },
                { name: "cursorZ", type: "byte" }
            ]},
            held_item_slot:   {id: 0x09, fields: [
                { name: "slotId", type: "short" }
            ]},
            arm_animation:          {id: 0x0a, fields: []},
            entity_action:      {id: 0x0b, fields: [
                { name: "entityId", type: "varint" },
                { name: "actionId", type: "varint" },
                { name: "jumpBoost", type: "varint" }
            ]},
            steer_vehicle:      {id: 0x0c, fields: [
                { name: "sideways", type: "float" },
                { name: "forward", type: "float" },
                { name: "jump", type: "ubyte" }
            ]},
            close_window:       {id: 0x0d, fields: [
                { name: "windowId", type: "byte" }
            ]},
            window_click:       {id: 0x0e, fields: [
                { name: "windowId", type: "byte" },
                { name: "slot", type: "short" },
                { name: "mouseButton", type: "byte" },
                { name: "action", type: "short" },
                { name: "mode", type: "byte" },
                { name: "item", type: "slot" }
            ]},
            transaction: {id: 0x0f, fields: [
                { name: "windowId", type: "byte" },
                { name: "action", type: "short" },
                { name: "accepted", type: "bool" }
            ]},
            set_creative_slot: {id: 0x10, fields: [
                { name: "slot", type: "short" },
                { name: "item", type: "slot" }
            ]},
            enchant_item:       {id: 0x11, fields: [
                { name: "windowId", type: "byte" },
                { name: "enchantment", type: "byte" }
            ]},
            update_sign:        {id: 0x12, fields: [
                { name: "location", type: "position" },
                { name: "text1", type: "string" },
                { name: "text2", type: "string" },
                { name: "text3", type: "string" },
                { name: "text4", type: "string" }
            ]},
            abilities:   {id: 0x13, fields: [
                { name: "flags", type: "byte" },
                { name: "flyingSpeed", type: "float" },
                { name: "walkingSpeed", type: "float" }
            ]},
            tab_complete:       {id: 0x14, fields: [
                { name: "text", type: "string" },
                { name: "hasPosition", type: "bool" },
                { name: "block", type: "position", condition: {"field":"hasPosition","values":[true]}}
            ]},
            settings:    {id: 0x15, fields: [
                { name: "locale", type: "string" },
                { name: "viewDistance", type: "byte" },
                { name: "chatFlags", type: "byte" },
                { name: "chatColors", type: "bool" },
                { name: "skinParts", type: "ubyte" }
            ]},
            client_command:      {id: 0x16, fields: [
                { name: "payload", type: "varint" }
            ]},
            custom_payload:     {id: 0x17, fields: [
                { name: "channel", type: "string" }, /* TODO: wiki.vg sats no dataLength is needed? */
                { name: "data", type: "restBuffer"}
            ]},
            spectate: { id: 0x18, fields: [
                { name: "target", type: "UUID"}
            ]},
            resource_pack_receive: { id: 0x19, fields: [
                { name: "hash", type: "string" },
                { name: "result", type: "varint" }
            ]}
        }
    }
};
