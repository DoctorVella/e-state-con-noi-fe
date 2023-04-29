export const SESSION_EXPIRED = "SESSION_EXPIRED";
export const SESSION_TO_INIT = "SESSION_TO_INIT";
export const SESSION_OK = "SESSION_OK";

export const AUTH_LEVEL_ADMIN = "ADMIN";
export const AUTH_LEVEL_ANIMATORE = "ANIMATORE";
export const AUTH_LEVEL_ISCRITTORE = "ISCRITTORE";

export const PLAYER_PAGE_CREATE_MODE = "CREATE";
export const PLAYER_PAGE_UPDATE_MODE = "UPDATE";
export const PLAYER_PAGE_VIEW_MODE = "VIEW";

export const DEFAULT_2W_STANDARD = 50;
export const DEFAULT_1W_STANDARD = 30;
export const DEFAULT_2W_BROTHER = 40;
export const DEFAULT_1W_BROTHER = 30;

export const AZZURRI_TEAM_NAME = "AZZURRI";
export const GIALLI_TEAM_NAME = "GIALLI";
export const ROSSI_TEAM_NAME = "ROSSI";
export const VERDI_TEAM_NAME = "VERDI";
export const NOT_ASSIGNED_TEAM_NAME = "NON ASSEGNATI";
export const TEAM_NAMES = [AZZURRI_TEAM_NAME, GIALLI_TEAM_NAME, ROSSI_TEAM_NAME, VERDI_TEAM_NAME];

export const SCORE_TYPE_1_VS_1 = "1vs1";
export const SCORE_TYPE_ALL_VS_ALL = "ALLvsALL";
export const SCORE_TYPE_NONE = "None";

export const SUBACTIVITY_TYPE_KEY_MINIGIOCO = "MINIGIOCO";
export const SUBACTIVITY_TYPE_KEY_MANCHE_1_VS_1 = "MANCHE_1_VS_1";
export const SUBACTIVITY_TYPE_KEY_MANCHE_ALL_VS_ALL = "MANCHE_ALL_VS_ALL";
export const SUBACTIVITY_TYPE_KEY_SPORT = "SPORT";
export const SUBACTIVITY_TYPE_KEY_RAPPRESENTAZIONE = "RAPPRESENTAZIONE";

export const WEEK_DAY = ["Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato","Domenica"];

export const SUBACTIVITY_TYPES = new Map([
    [
        SUBACTIVITY_TYPE_KEY_MINIGIOCO,
        {
            label: "MINIGIOCO",
            hasDescription: true,
            scoreType: SCORE_TYPE_NONE
        }
    ],
    [
        SUBACTIVITY_TYPE_KEY_MANCHE_1_VS_1,
        {
            label: "MANCHE 1 VS 1",
            hasDescription: false,
            scoreType: SCORE_TYPE_1_VS_1
        }
    ],
    [
        SUBACTIVITY_TYPE_KEY_MANCHE_ALL_VS_ALL,
        {
            label: "MANCHE TUTTI VS TUTTI",
            hasDescription: false,
            scoreType: SCORE_TYPE_ALL_VS_ALL
        }
    ],
    [
        SUBACTIVITY_TYPE_KEY_SPORT,
        {
            label: "SPORT",
            hasDescription: true,
            scoreType: SCORE_TYPE_NONE
        }
    ],
    [
        SUBACTIVITY_TYPE_KEY_RAPPRESENTAZIONE,
        {
            label: "RAPPRESENTAZIONE",
            hasDescription: true,
            scoreType: SCORE_TYPE_ALL_VS_ALL
        }
    ]
]);

export const ACTIVITY_TYPE_KEY_GRANDE_GIOCO = "GRANDE_GIOCO";
export const ACTIVITY_TYPE_KEY_OLIMPIADI = "OLIMPIADI";
export const ACTIVITY_TYPE_KEY_STAFFETTA_1_VS_1 = "STAFFETTA_1_VS_1";
export const ACTIVITY_TYPE_KEY_STAFFETTA_ALL_VS_ALL = "STAFFETTA_ALL_VS_ALL";
export const ACTIVITY_TYPE_KEY_CACCIA_AL_TESORO = "CACCIA_AL_TESORO";
export const ACTIVITY_TYPE_KEY_STAFFETTA_1_VS_1_ACQUA = "STAFFETTA_1_VS_1_ACQUA";
export const ACTIVITY_TYPE_KEY_STAFFETTA_ALL_VS_ALL_ACQUA = "STAFFETTA_ALL_VS_ALL_ACQUA";
export const ACTIVITY_TYPE_KEY_PROVA_FINALE = "PROVA_FINALE";
export const ACTIVITY_TYPE_KEY_PROVA_ANIMATORE = "PROVA_ANIMATORE";

export const ACTIVITY_TYPES = new Map([
    [
        ACTIVITY_TYPE_KEY_GRANDE_GIOCO,
        {
            label: "GRANDE GIOCO",
            chipColor: "#f94fff",
            subactivityTypeKey: SUBACTIVITY_TYPE_KEY_MINIGIOCO
        }
    ],
    [
        ACTIVITY_TYPE_KEY_OLIMPIADI,
        {
            label: "OLIMPIADI",
            chipColor: "#858585",
            subactivityTypeKey: SUBACTIVITY_TYPE_KEY_SPORT
        }
    ],
    [
        ACTIVITY_TYPE_KEY_STAFFETTA_1_VS_1,
        {
            label: "STAFFETTA 1 VS 1",
            chipColor: "#ff1f1f",
            subactivityTypeKey: SUBACTIVITY_TYPE_KEY_MANCHE_1_VS_1
        }
    ],
    [
        ACTIVITY_TYPE_KEY_STAFFETTA_ALL_VS_ALL,
        {
            label: "STAFFETTA TUTTI VS TUTTI",
            chipColor: "#ff1f1f",
            subactivityTypeKey: SUBACTIVITY_TYPE_KEY_MANCHE_ALL_VS_ALL
        }
    ],
    [
        ACTIVITY_TYPE_KEY_CACCIA_AL_TESORO,
        {
            label: "CACCIA AL TESORO",
            chipColor: "#2bb545",
            subactivityTypeKey: SUBACTIVITY_TYPE_KEY_MINIGIOCO
        }
    ],
    [
        ACTIVITY_TYPE_KEY_STAFFETTA_1_VS_1_ACQUA,
        {
            label: "STAFFETTA 1 VS 1 (GIOCO D'ACQUA)",
            chipColor: "#2b4cb5",
            subactivityTypeKey: SUBACTIVITY_TYPE_KEY_MANCHE_1_VS_1
        }
    ],
    [
        ACTIVITY_TYPE_KEY_STAFFETTA_ALL_VS_ALL_ACQUA,
        {
            label: "STAFFETTA TUTTI VS TUTTI (GIOCO D'ACQUA)",
            chipColor: "#2b4cb5",
            subactivityTypeKey: SUBACTIVITY_TYPE_KEY_MANCHE_ALL_VS_ALL
        }
    ],
    [
        ACTIVITY_TYPE_KEY_PROVA_FINALE,
        {
            label: "PROVA FINALE",
            chipColor: "#801919",
            subactivityTypeKey: SUBACTIVITY_TYPE_KEY_RAPPRESENTAZIONE
        }
    ],
    [
        ACTIVITY_TYPE_KEY_PROVA_ANIMATORE,
        {
            label: "PROVA ANIMATORE",
            chipColor: "#F7931E"
        }
    ]
]);