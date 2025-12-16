// --- 1. BASE DE DADOS (Mantida) ---
const csvData = `AC;AC;ACAC;19|AC;AL;ACAL;12|AC;AM;ACAM;12|AC;AP;ACAP;12|AC;BA;ACBA;12|AC;CE;ACCE;12|AC;DF;ACDF;12|AC;ES;ACES;12|AC;GO;ACGO;12|AC;MA;ACMA;12|AC;MT;ACMT;12|AC;MS;ACMS;12|AC;MG;ACMG;12|AC;PA;ACPA;12|AC;PB;ACPB;12|AC;PR;ACPR;12|AC;PE;ACPE;12|AC;PI;ACPI;12|AC;RN;ACRN;12|AC;RS;ACRS;12|AC;RJ;ACRJ;12|AC;RO;ACRO;12|AC;RR;ACRR;12|AC;SC;ACSC;12|AC;SP;ACSP;12|AC;SE;ACSE;12|AC;TO;ACTO;12|AC;IM;ACIM;4|AL;AC;ALAC;12|AL;AL;ALAL;20|AL;AM;ALAM;12|AL;AP;ALAP;12|AL;BA;ALBA;12|AL;CE;ALCE;12|AL;DF;ALDF;12|AL;ES;ALES;12|AL;GO;ALGO;12|AL;MA;ALMA;12|AL;MT;ALMT;12|AL;MS;ALMS;12|AL;MG;ALMG;12|AL;PA;ALPA;12|AL;PB;ALPB;12|AL;PR;ALPR;12|AL;PE;ALPE;12|AL;PI;ALPI;12|AL;RN;ALRN;12|AL;RS;ALRS;12|AL;RJ;ALRJ;12|AL;RO;ALRO;12|AL;RR;ALRR;12|AL;SC;ALSC;12|AL;SP;ALSP;12|AL;SE;ALSE;12|AL;TO;ALTO;12|AL;IM;ALIM;4|AM;AC;AMAC;12|AM;AL;AMAL;12|AM;AM;AMAM;20|AM;AP;AMAP;12|AM;BA;AMBA;12|AM;CE;AMCE;12|AM;DF;AMDF;12|AM;ES;AMES;12|AM;GO;AMGO;12|AM;MA;AMMA;12|AM;MT;AMMT;12|AM;MS;AMMS;12|AM;MG;AMMG;12|AM;PA;AMPA;12|AM;PB;AMPB;12|AM;PR;AMPR;12|AM;PE;AMPE;12|AM;PI;AMPI;12|AM;RN;AMRN;12|AM;RS;AMRS;12|AM;RJ;AMRJ;12|AM;RO;AMRO;12|AM;RR;AMRR;12|AM;SC;AMSC;12|AM;SP;AMSP;12|AM;SE;AMSE;12|AM;TO;AMTO;12|AM;IM;AMIM;4|AP;AC;APAC;12|AP;AL;APAL;12|AP;AM;APAM;12|AP;AP;APAP;18|AP;BA;APBA;12|AP;CE;APCE;12|AP;DF;APDF;12|AP;ES;APES;12|AP;GO;APGO;12|AP;MA;APMA;12|AP;MT;APMT;12|AP;MS;APMS;12|AP;MG;APMG;12|AP;PA;APPA;12|AP;PB;APPB;12|AP;PR;APPR;12|AP;PE;APPE;12|AP;PI;APPI;12|AP;RN;APRN;12|AP;RS;APRS;12|AP;RJ;APRJ;12|AP;RO;APRO;12|AP;RR;APRR;12|AP;SC;APSC;12|AP;SP;APSP;12|AP;SE;APSE;12|AP;TO;APTO;12|AP;IM;APIM;4|BA;AC;BAAC;12|BA;AL;BAAL;12|BA;AM;BAAM;12|BA;AP;BAAP;12|BA;BA;BABA;20,5|BA;CE;BACE;12|BA;DF;BADF;12|BA;ES;BAES;12|BA;GO;BAGO;12|BA;MA;BAMA;12|BA;MT;BAMT;12|BA;MS;BAMS;12|BA;MG;BAMG;12|BA;PA;BAPA;12|BA;PB;BAPB;12|BA;PR;BAPR;12|BA;PE;BAPE;12|BA;PI;BAPI;12|BA;RN;BARN;12|BA;RS;BARS;12|BA;RJ;BARJ;12|BA;RO;BARO;12|BA;RR;BARR;12|BA;SC;BASC;12|BA;SP;BASP;12|BA;SE;BASE;12|BA;TO;BATO;12|BA;IM;BAIM;4|CE;AC;CEAC;12|CE;AL;CEAL;12|CE;AM;CEAM;12|CE;AP;CEAP;12|CE;BA;CEBA;12|CE;CE;CECE;20|CE;DF;CEDF;12|CE;ES;CEES;12|CE;GO;CEGO;12|CE;MA;CEMA;12|CE;MT;CEMT;12|CE;MS;CEMS;12|CE;MG;CEMG;12|CE;PA;CEPA;12|CE;PB;CEPB;12|CE;PR;CEPR;12|CE;PE;CEPE;12|CE;PI;CEPI;12|CE;RN;CERN;12|CE;RS;CERS;12|CE;RJ;CERJ;12|CE;RO;CERO;12|CE;RR;CERR;12|CE;SC;CESC;12|CE;SP;CESP;12|CE;SE;CESE;12|CE;TO;CETO;12|CE;IM;CEIM;4|DF;AC;DFAC;12|DF;AL;DFAL;12|DF;AM;DFAM;12|DF;AP;DFAP;12|DF;BA;DFBA;12|DF;CE;DFCE;12|DF;DF;DFDF;20|DF;ES;DFES;12|DF;GO;DFGO;12|DF;MA;DFMA;12|DF;MT;DFMT;12|DF;MS;DFMS;12|DF;MG;DFMG;12|DF;PA;DFPA;12|DF;PB;DFPB;12|DF;PR;DFPR;12|DF;PE;DFPE;12|DF;PI;DFPI;12|DF;RN;DFRN;12|DF;RS;DFRS;12|DF;RJ;DFRJ;12|DF;RO;DFRO;12|DF;RR;DFRR;12|DF;SC;DFSC;12|DF;SP;DFSP;12|DF;SE;DFSE;12|DF;TO;DFTO;12|DF;IM;DFIM;4|ES;AC;ESAC;12|ES;AL;ESAL;12|ES;AM;ESAM;12|ES;AP;ESAP;12|ES;BA;ESBA;12|ES;CE;ESCE;12|ES;DF;ESDF;12|ES;ES;ESES;17|ES;GO;ESGO;12|ES;MA;ESMA;12|ES;MT;ESMT;12|ES;MS;ESMS;12|ES;MG;ESMG;12|ES;PA;ESPA;12|ES;PB;ESPB;12|ES;PR;ESPR;12|ES;PE;ESPE;12|ES;PI;ESPI;12|ES;RN;ESRN;12|ES;RS;ESRS;12|ES;RJ;ESRJ;12|ES;RO;ESRO;12|ES;RR;ESRR;12|ES;SC;ESSC;12|ES;SP;ESSP;12|ES;SE;ESSE;12|ES;TO;ESTO;12|ES;IM;ESIM;4|GO;AC;GOAC;12|GO;AL;GOAL;12|GO;AM;GOAM;12|GO;AP;GOAP;12|GO;BA;GOBA;12|GO;CE;GOCE;12|GO;DF;GODF;12|GO;ES;GOES;12|GO;GO;GOGO;19|GO;MA;GOMA;12|GO;MT;GOMT;12|GO;MS;GOMS;12|GO;MG;GOMG;12|GO;PA;GOPA;12|GO;PB;GOPB;12|GO;PR;GOPR;12|GO;PE;GOPE;12|GO;PI;GOPI;12|GO;RN;GORN;12|GO;RS;GORS;12|GO;RJ;GORJ;12|GO;RO;GORO;12|GO;RR;GORR;12|GO;SC;GOSC;12|GO;SP;GOSP;12|GO;SE;GOSE;12|GO;TO;GOTO;12|GO;IM;GOIM;4|MA;AC;MAAC;12|MA;AL;MAAL;12|MA;AM;MAAM;12|MA;AP;MAAP;12|MA;BA;MABA;12|MA;CE;MACE;12|MA;DF;MADF;12|MA;ES;MAES;12|MA;GO;MAGO;12|MA;MA;MAMA;23|MA;MT;MAMT;12|MA;MS;MAMS;12|MA;MG;MAMG;12|MA;PA;MAPA;12|MA;PB;MAPB;12|MA;PR;MAPR;12|MA;PE;MAPE;12|MA;PI;MAPI;12|MA;RN;MARN;12|MA;RS;MARS;12|MA;RJ;MARJ;12|MA;RO;MARO;12|MA;RR;MARR;12|MA;SC;MASC;12|MA;SP;MASP;12|MA;SE;MASE;12|MA;TO;MATO;12|MA;IM;MAIM;4|MT;AC;MTAC;12|MT;AL;MTAL;12|MT;AM;MTAM;12|MT;AP;MTAP;12|MT;BA;MTBA;12|MT;CE;MTCE;12|MT;DF;MTDF;12|MT;ES;MTES;12|MT;GO;MTGO;12|MT;MA;MTMA;12|MT;MT;MTMT;17|MT;MS;MTMS;12|MT;MG;MTMG;12|MT;PA;MTPA;12|MT;PB;MTPB;12|MT;PR;MTPR;12|MT;PE;MTPE;12|MT;PI;MTPI;12|MT;RN;MTRN;12|MT;RS;MTRS;12|MT;RJ;MTRJ;12|MT;RO;MTRO;12|MT;RR;MTRR;12|MT;SC;MTSC;12|MT;SP;MTSP;12|MT;SE;MTSE;12|MT;TO;MTTO;12|MT;IM;MTIM;4|MS;AC;MSAC;12|MS;AL;MSAL;12|MS;AM;MSAM;12|MS;AP;MSAP;12|MS;BA;MSBA;12|MS;CE;MSCE;12|MS;DF;MSDF;12|MS;ES;MSES;12|MS;GO;MSGO;12|MS;MA;MSMA;12|MS;MT;MSMT;12|MS;MS;MSMS;17|MS;MG;MSMG;12|MS;PA;MSPA;12|MS;PB;MSPB;12|MS;PR;MSPR;12|MS;PE;MSPE;12|MS;PI;MSPI;12|MS;RN;MSRN;12|MS;RS;MSRS;12|MS;RJ;MSRJ;12|MS;RO;MSRO;12|MS;RR;MSRR;12|MS;SC;MSSC;12|MS;SP;MSSP;12|MS;SE;MSSE;12|MS;TO;MSTO;12|MS;IM;MSIM;4|MG;AC;MGAC;7|MG;AL;MGAL;7|MG;AM;MGAM;7|MG;AP;MGAP;7|MG;BA;MGBA;7|MG;CE;MGCE;7|MG;DF;MGDF;7|MG;ES;MGES;7|MG;GO;MGGO;7|MG;MA;MGMA;7|MG;MT;MGMT;7|MG;MS;MGMS;7|MG;MG;MGMG;18|MG;PA;MGPA;7|MG;PB;MGPB;7|MG;PR;MGPR;12|MG;PE;MGPE;7|MG;PI;MGPI;7|MG;RN;MGRN;7|MG;RS;MGRS;12|MG;RJ;MGRJ;12|MG;RO;MGRO;7|MG;RR;MGRR;7|MG;SC;MGSC;12|MG;SP;MGSP;12|MG;SE;MGSE;7|MG;TO;MGTO;7|MG;IM;MGIM;4|PA;AC;PAAC;12|PA;AL;PAAL;12|PA;AM;PAAM;12|PA;AP;PAAP;12|PA;BA;PABA;12|PA;CE;PACE;12|PA;DF;PADF;12|PA;ES;PAES;12|PA;GO;PAGO;12|PA;MA;PAMA;12|PA;MT;PAMT;12|PA;MS;PAMS;12|PA;MG;PAMG;12|PA;PA;PAPA;19|PA;PB;PAPB;12|PA;PR;PAPR;12|PA;PE;PAPE;12|PA;PI;PAPI;12|PA;RN;PARN;12|PA;RS;PARS;12|PA;RJ;PARJ;12|PA;RO;PARO;12|PA;RR;PARR;12|PA;SC;PASC;12|PA;SP;PASP;12|PA;SE;PASE;12|PA;TO;PATO;12|PA;IM;PAIM;4|PB;AC;PBAC;12|PB;AL;PBAL;12|PB;AM;PBAM;12|PB;AP;PBAP;12|PB;BA;PBBA;12|PB;CE;PBCE;12|PB;DF;PBDF;12|PB;ES;PBES;12|PB;GO;PBGO;12|PB;MA;PBMA;12|PB;MT;PBMT;12|PB;MS;PBMS;12|PB;MG;PBMG;12|PB;PA;PBPA;12|PB;PB;PBPB;20|PB;PR;PBPR;12|PB;PE;PBPE;12|PB;PI;PBPI;12|PB;RN;PBRN;12|PB;RS;PBRS;12|PB;RJ;PBRJ;12|PB;RO;PBRO;12|PB;RR;PBRR;12|PB;SC;PBSC;12|PB;SP;PBSP;12|PB;SE;PBSE;12|PB;TO;PBTO;12|PB;IM;PBIM;4|PR;AC;PRAC;7|PR;AL;PRAL;7|PR;AM;PRAM;7|PR;AP;PRAP;7|PR;BA;PRBA;7|PR;CE;PRCE;7|PR;DF;PRDF;7|PR;ES;PRES;7|PR;GO;PRGO;7|PR;MA;PRMA;7|PR;MT;PRMT;7|PR;MS;PRMS;7|PR;MG;PRMG;12|PR;PA;PRPA;7|PR;PB;PRPB;7|PR;PR;PRPR;19,5|PR;PE;PRPE;7|PR;PI;PRPI;7|PR;RN;PRRN;7|PR;RS;PRRS;12|PR;RJ;PRRJ;12|PR;RO;PRRO;7|PR;RR;PRRR;7|PR;SC;PRSC;12|PR;SP;PRSP;12|PR;SE;PRSE;7|PR;TO;PRTO;7|PR;IM;PRIM;4|PE;AC;PEAC;12|PE;AL;PEAL;12|PE;AM;PEAM;12|PE;AP;PEAP;12|PE;BA;PEBA;12|PE;CE;PECE;12|PE;DF;PEDF;12|PE;ES;PEES;12|PE;GO;PEGO;12|PE;MA;PEMA;12|PE;MT;PEMT;12|PE;MS;PEMS;12|PE;MG;PEMG;12|PE;PA;PEPA;12|PE;PB;PEPB;12|PE;PR;PEPR;12|PE;PE;PEPE;20,5|PE;PI;PEPI;12|PE;RN;PERN;12|PE;RS;PERS;12|PE;RJ;PERJ;12|PE;RO;PERO;12|PE;RR;PERR;12|PE;SC;PESC;12|PE;SP;PESP;12|PE;SE;PESE;12|PE;TO;PETO;12|PE;IM;PEIM;4|PI;AC;PIAC;12|PI;AL;PIAL;12|PI;AM;PIAM;12|PI;AP;PIAP;12|PI;BA;PIBA;12|PI;CE;PICE;12|PI;DF;PIDF;12|PI;ES;PIES;12|PI;GO;PIGO;12|PI;MA;PIMA;12|PI;MT;PIMT;12|PI;MS;PIMS;12|PI;MG;PIMG;12|PI;PA;PIPA;12|PI;PB;PIPB;12|PI;PR;PIPR;12|PI;PE;PIPE;12|PI;PI;PIPI;22,5|PI;RN;PIRN;12|PI;RS;PIRS;12|PI;RJ;PIRJ;12|PI;RO;PIRO;12|PI;RR;PIRR;12|PI;SC;PISC;12|PI;SP;PISP;12|PI;SE;PISE;12|PI;TO;PITO;12|PI;IM;PIIM;4|RN;AC;RNAC;12|RN;AL;RNAL;12|RN;AM;RNAM;12|RN;AP;RNAP;12|RN;BA;RNBA;12|RN;CE;RNCE;12|RN;DF;RNDF;12|RN;ES;RNES;12|RN;GO;RNGO;12|RN;MA;RNMA;12|RN;MT;RNMT;12|RN;MS;RNMS;12|RN;MG;RNMG;12|RN;PA;RNPA;12|RN;PB;RNPB;12|RN;PR;RNPR;12|RN;PE;RNPE;12|RN;PI;RNPI;12|RN;RN;RNRN;20|RN;RS;RNRS;12|RN;RJ;RNRJ;12|RN;RO;RNRO;12|RN;RR;RNRR;12|RN;SC;RNSC;12|RN;SP;RNSP;12|RN;SE;RNSE;12|RN;TO;RNTO;12|RN;IM;RNIM;4|RS;AC;RSAC;7|RS;AL;RSAL;7|RS;AM;RSAM;7|RS;AP;RSAP;7|RS;BA;RSBA;7|RS;CE;RSCE;7|RS;DF;RSDF;7|RS;ES;RSES;7|RS;GO;RSGO;7|RS;MA;RSMA;7|RS;MT;RSMT;7|RS;MS;RSMS;7|RS;MG;RSMG;12|RS;PA;RSPA;7|RS;PB;RSPB;7|RS;PR;RSPR;12|RS;PE;RSPE;7|RS;PI;RSPI;7|RS;RN;RSRN;7|RS;RS;RSRS;17|RS;RJ;RSRJ;12|RS;RO;RSRO;7|RS;RR;RSRR;7|RS;SC;RSSC;12|RS;SP;RSSP;12|RS;SE;RSSE;7|RS;TO;RSTO;7|RS;IM;RSIM;4|RJ;AC;RJAC;7|RJ;AL;RJAL;7|RJ;AM;RJAM;7|RJ;AP;RJAP;7|RJ;BA;RJBA;7|RJ;CE;RJCE;7|RJ;DF;RJDF;7|RJ;ES;RJES;7|RJ;GO;RJGO;7|RJ;MA;RJMA;7|RJ;MT;RJMT;7|RJ;MS;RJMS;7|RJ;MG;RJMG;12|RJ;PA;RJPA;7|RJ;PB;RJPB;7|RJ;PR;RJPR;12|RJ;PE;RJPE;7|RJ;PI;RJPI;7|RJ;RN;RJRN;7|RJ;RS;RJRS;12|RJ;RJ;RJRJ;22|RJ;RO;RJRO;7|RJ;RR;RJRR;7|RJ;SC;RJSC;12|RJ;SP;RJSP;12|RJ;SE;RJSE;7|RJ;TO;RJTO;7|RJ;IM;RJIM;4|RO;AC;ROAC;12|RO;AL;ROAL;12|RO;AM;ROAM;12|RO;AP;ROAP;12|RO;BA;ROBA;12|RO;CE;ROCE;12|RO;DF;RODF;12|RO;ES;ROES;12|RO;GO;ROGO;12|RO;MA;ROMA;12|RO;MT;ROMT;12|RO;MS;ROMS;12|RO;MG;ROMG;12|RO;PA;ROPA;12|RO;PB;ROPB;12|RO;PR;ROPR;12|RO;PE;ROPE;12|RO;PI;ROPI;12|RO;RN;RORN;12|RO;RS;RORS;12|RO;RJ;RORJ;12|RO;RO;RORO;19,5|RO;RR;RORR;12|RO;SC;ROSC;12|RO;SP;ROSP;12|RO;SE;ROSE;12|RO;TO;ROTO;12|RO;IM;ROIM;4|RR;AC;RRAC;12|RR;AL;RRAL;12|RR;AM;RRAM;12|RR;AP;RRAP;12|RR;BA;RRBA;12|RR;CE;RRCE;12|RR;DF;RRDF;12|RR;ES;RRES;12|RR;GO;RRGO;12|RR;MA;RRMA;12|RR;MT;RRMT;12|RR;MS;RRMS;12|RR;MG;RRMG;12|RR;PA;RRPA;12|RR;PB;RRPB;12|RR;PR;RRPR;12|RR;PE;RRPE;12|RR;PI;RRPI;12|RR;RN;RRRN;12|RR;RS;RRRS;12|RR;RJ;RRRJ;12|RR;RO;RRRO;12|RR;RR;RRRR;20|RR;SC;RRSC;12|RR;SP;RRSP;12|RR;SE;RRSE;12|RR;TO;RRTO;12|RR;IM;RRIM;4|SC;AC;SCAC;7|SC;AL;SCAL;7|SC;AM;SCAM;7|SC;AP;SCAP;7|SC;BA;SCBA;7|SC;CE;SCCE;7|SC;DF;SCDF;7|SC;ES;SCES;7|SC;GO;SCGO;7|SC;MA;SCMA;7|SC;MT;SCMT;7|SC;MS;SCMS;7|SC;MG;SCMG;12|SC;PA;SCPA;7|SC;PB;SCPB;7|SC;PR;SCPR;12|SC;PE;SCPE;7|SC;PI;SCPI;7|SC;RN;SCRN;7|SC;RS;SCRS;12|SC;RJ;SCRJ;12|SC;RO;SCRO;7|SC;RR;SCRR;7|SC;SC;SCSC;17|SC;SP;SCSP;12|SC;SE;SCSE;7|SC;TO;SCTO;7|SC;IM;SCIM;4|SP;AC;SPAC;7|SP;AL;SPAL;7|SP;AM;SPAM;7|SP;AP;SPAP;7|SP;BA;SPBA;7|SP;CE;SPCE;7|SP;DF;SPDF;7|SP;ES;SPES;7|SP;GO;SPGO;7|SP;MA;SPMA;7|SP;MT;SPMT;7|SP;MS;SPMS;7|SP;MG;SPMG;12|SP;PA;SPPA;7|SP;PB;SPPB;7|SP;PR;SPPR;12|SP;PE;SPPE;7|SP;PI;SPPI;7|SP;RN;SPRN;7|SP;RS;SPRS;12|SP;RJ;SPRJ;12|SP;RO;SPRO;7|SP;RR;SPRR;7|SP;SC;SPSC;12|SP;SP;SPSP;18|SP;SE;SPSE;7|SP;TO;SPTO;7|SP;IM;SPIM;4|SE;AC;SEAC;12|SE;AL;SEAL;12|SE;AM;SEAM;12|SE;AP;SEAP;12|SE;BA;SEBA;12|SE;CE;SECE;12|SE;DF;SEDF;12|SE;ES;SEES;12|SE;GO;SEGO;12|SE;MA;SEMA;12|SE;MT;SEMT;12|SE;MS;SEMS;12|SE;MG;SEMG;12|SE;PA;SEPA;12|SE;PB;SEPB;12|SE;PR;SEPR;12|SE;PE;SEPE;12|SE;PI;SEPI;12|SE;RN;SERN;12|SE;RS;SERS;12|SE;RJ;SERJ;12|SE;RO;SERO;12|SE;RR;SERR;12|SE;SC;SESC;12|SE;SP;SESP;12|SE;SE;SESE;20|SE;TO;SETO;12|SE;IM;SEIM;4|TO;AC;TOAC;12|TO;AL;TOAL;12|TO;AM;TOAM;12|TO;AP;TOAP;12|TO;BA;TOBA;12|TO;CE;TOCE;12|TO;DF;TODF;12|TO;ES;TOES;12|TO;GO;TOGO;12|TO;MA;TOMA;12|TO;MT;TOMT;12|TO;MS;TOMS;12|TO;MG;TOMG;12|TO;PA;TOPA;12|TO;PB;TOPB;12|TO;PR;TOPR;12|TO;PE;TOPE;12|TO;PI;TOPI;12|TO;RN;TORN;12|TO;RS;TORS;12|TO;RJ;TORJ;12|TO;RO;TORO;12|TO;RR;TORR;12|TO;SC;TOSC;12|TO;SP;TOSP;12|TO;SE;TOSE;12|TO;TO;TOTO;20|TO;IM;TOIM;4|IM;AC;IMAC;4|IM;AL;IMAL;4|IM;AM;IMAM;4|IM;AP;IMAP;4|IM;BA;IMBA;4|IM;CE;IMCE;4|IM;DF;IMDF;4|IM;ES;IMES;4|IM;GO;IMGO;4|IM;MA;IMMA;4|IM;MT;IMMT;4|IM;MS;IMMS;4|IM;MG;IMMG;4|IM;PA;IMPA;4|IM;PB;IMPB;4|IM;PR;IMPR;4|IM;PE;IMPE;4|IM;PI;IMPI;4|IM;RN;IMRN;4|IM;RS;IMRS;4|IM;RJ;IMRJ;4|IM;RO;IMRO;4|IM;RR;IMRR;4|IM;SC;IMSC;4|IM;SP;IMSP;4|IM;SE;IMSE;4|IM;TO;IMTO;4|IM;IM;IMIM;0`;

// --- 1. BASE DE DADOS ---
// (Mantenha sua constante csvData aqui no topo)

// Parse Data
const tabelaICMS = {};
const linhas = csvData.split('|'); 
const ufs = new Set();

linhas.forEach(linha => {
    const cols = linha.split(';');
    if(cols.length >= 4) {
        const origem = cols[0];
        const destino = cols[1];
        const aliquota = parseFloat(cols[3].replace(',', '.'));

        if (!tabelaICMS[origem]) tabelaICMS[origem] = {};
        tabelaICMS[origem][destino] = aliquota;

        ufs.add(origem);
        ufs.add(destino);
    }
});

// Populate Selects
const listaUFS = Array.from(ufs).sort();
const selOrigem = document.getElementById('ufOrigem');
const selDestino = document.getElementById('ufDestino');

function criarOpcoes(select) {
    const padrao = document.createElement('option');
    padrao.text = "Selecione";
    padrao.value = "";
    select.add(padrao);
    listaUFS.forEach(uf => {
        const opt = document.createElement('option');
        opt.value = uf;
        opt.text = uf;
        select.add(opt);
    });
}
criarOpcoes(selOrigem);
criarOpcoes(selDestino);

// Utilities
function formatarMoeda(input) {
    let valor = input.value.replace(/\D/g, "");
    if (valor === "") { input.value = ""; return; }
    valor = (parseInt(valor) / 100).toFixed(2);
    valor = valor.replace(".", ",");
    valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    input.value = valor;
}

function lerNumero(id) {
    let val = document.getElementById(id).value;
    if(!val) return 0;
    return parseFloat(val.replace(/\./g, "").replace(",", ".")) || 0;
}

function formatBRL(valor) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

// --- LÓGICA DE CÁLCULO (POR DENTRO) ---
function calcularAutomatico() {
    const uf1 = selOrigem.value;
    const uf2 = selDestino.value;
    let aliquota = 0;

    // 1. Alíquota
    if (uf1 && uf2 && tabelaICMS[uf1] && tabelaICMS[uf1][uf2] !== undefined) {
        aliquota = tabelaICMS[uf1][uf2];
        document.getElementById('aliquotaDisplay').value = aliquota.toString().replace('.', ',') + "%";
    } else {
        document.getElementById('aliquotaDisplay').value = "-";
    }

    // 2. Valores
    const vlrNota = lerNumero('valorNf');
    const pesoNota = lerNumero('pesoNf');
    const pesoPend = lerNumero('pesoPendente');

    // 3. Cálculo
    if (vlrNota > 0 && pesoNota > 0 && pesoPend > 0 && aliquota > 0) {
        const precoPorKg = vlrNota / pesoNota;
        const valorMercadoriaOriginal = precoPorKg * pesoPend;
        
        // Base de Cálculo "Por Dentro" (Gross-up)
        const taxaDecimal = aliquota / 100;
        const baseCalculo = valorMercadoriaOriginal / (1 - taxaDecimal);
        
        // Valor ICMS
        const valorICMS = baseCalculo * taxaDecimal;

        // Update UI
        document.getElementById('valorCobranca').value = valorICMS.toFixed(2).replace('.',',').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        
        document.getElementById('debugCalc').innerHTML = 
            `Valor Mercadoria: ${formatBRL(valorMercadoriaOriginal)} <br> Base (Gross-up): ${formatBRL(baseCalculo)}`;
    } else {
        document.getElementById('valorCobranca').value = "";
        document.getElementById('debugCalc').innerHTML = "";
    }
}

// --- GERADOR DE EMAIL (COM SAUDAÇÃO AUTOMÁTICA) ---
function gerarEmail() {
    const motivo = document.getElementById('motivo').value;
    const produto = document.getElementById('produto').value || "Não informado";
    const ufOrigem = document.getElementById('ufOrigem').value;
    const ufDestino = document.getElementById('ufDestino').value;
    const aliquotaTxt = document.getElementById('aliquotaDisplay').value;
    
    // Dados numéricos
    const vlrNota = lerNumero('valorNf');
    const pesoNota = lerNumero('pesoNf');
    const pesoPend = lerNumero('pesoPendente');
    const aliquota = parseFloat(aliquotaTxt.replace('%','').replace(',','.')) || 0;
    
    // Recalcula lógica para o HTML
    const precoPorKg = vlrNota / pesoNota;
    const valorMercadoriaOriginal = precoPorKg * pesoPend;
    const taxaDecimal = aliquota / 100;
    const baseCalculo = valorMercadoriaOriginal / (1 - taxaDecimal);
    const vlrCobranca = baseCalculo * taxaDecimal;

    if(!vlrCobranca || vlrCobranca === 0) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    // --- LÓGICA DA SAUDAÇÃO ---
    const horaAtual = new Date().getHours();
    let saudacao = "Bom dia";
    if (horaAtual >= 12 && horaAtual < 18) {
        saudacao = "Boa tarde";
    } else if (horaAtual >= 18) {
        saudacao = "Boa noite";
    }

    // Layout
    const html = `
        <div style="font-family: 'Segoe UI', Tahoma, Arial, sans-serif; color: #333; font-size: 14px; background-color: #ffffff;">
            
            <p style="margin-bottom: 20px;">Prezados, <strong>${saudacao}.</strong></p>
            <p>Gentileza verificar e autorizar o recolhimento do saldo pendente identificado abaixo:</p>
            
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #f8f9fa; border-left: 4px solid #c0392b; margin-bottom: 20px;">
                <tr>
                    <td style="padding: 15px;">
                        <span style="font-size: 10px; text-transform: uppercase; color: #666; font-weight: bold; letter-spacing: 1px;">MOTIVO DA PENDÊNCIA</span><br>
                        <span style="font-size: 15px; font-weight: bold; color: #2c3e50;">${motivo}</span>
                    </td>
                </tr>
            </table>

            <p style="font-size: 13px; font-weight: bold; margin-bottom: 5px; color: #555;">Detalhamento da Operação:</p>
            <table width="100%" cellpadding="10" cellspacing="0" style="max-width: 600px; border-collapse: collapse; border-bottom: 2px solid #eee;">
                <tr style="border-bottom: 1px solid #eee;">
                    <td width="30%" style="color: #666;"><strong>Produto:</strong></td>
                    <td style="color: #333;">${produto}</td>
                </tr>
                <tr style="border-bottom: 1px solid #eee;">
                    <td style="color: #666;"><strong>Rota:</strong></td>
                    <td style="color: #333;">${ufOrigem} <span style="color:#999;">&rarr;</span> ${ufDestino}</td>
                </tr>
                <tr style="border-bottom: 1px solid #eee;">
                    <td style="color: #666;"><strong>Peso Pendente:</strong></td>
                    <td style="color: #333;">${new Intl.NumberFormat('pt-BR').format(pesoPend)} kg</td>
                </tr>
                <tr>
                    <td style="color: #666;"><strong>Alíquota:</strong></td>
                    <td style="color: #333;"><span style="background-color: #eee; padding: 2px 6px; border-radius: 3px; font-size: 12px;">${aliquotaTxt}</span></td>
                </tr>
            </table>

            <br>

            <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; border: 1px solid #e0e0e0; border-radius: 4px; overflow: hidden;">
                <tr style="background-color: #2c3e50;">
                    <td colspan="2" style="padding: 10px 15px; color: #ffffff; font-size: 12px; font-weight: bold; text-transform: uppercase;">
                        Memória de Cálculo (ICMS "Por Dentro")
                    </td>
                </tr>
                <tr>
                    <td width="50%" style="padding: 15px; border-bottom: 1px solid #eee; border-right: 1px solid #eee;">
                        <div style="font-size: 11px; color: #999; margin-bottom: 4px;">BASE DE CÁLCULO (GROSS-UP)</div>
                        <div style="font-size: 16px; color: #555;">${formatBRL(baseCalculo)}</div>
                    </td>
                    <td width="50%" style="padding: 15px; background-color: #fff5f5; border-bottom: 1px solid #c0392b;">
                        <div style="font-size: 11px; color: #c0392b; margin-bottom: 4px; font-weight:bold;">VALOR A RECOLHER</div>
                        <div style="font-size: 20px; color: #c0392b; font-weight: bold;">${formatBRL(vlrCobranca)}</div>
                    </td>
                </tr>
            </table>

            <p style="font-size: 11px; color: #999; margin-top: 10px;">
                *Cálculo realizado considerando a tributação vigente entre as UFs sem incidência de multa/juros até a data atual.
            </p>

            <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;">
                <p style="margin: 0; color: #333;"><strong>Export Inventory Control</strong></p>
            </div>
        </div>
    `;
    document.getElementById('emailPreview').innerHTML = html;
}

// --- FUNÇÃO PARA COPIAR ---
async function copiarEmail() {
    const emailContent = document.getElementById('emailPreview');
    try {
        const type = "text/html";
        const blob = new Blob([emailContent.innerHTML], { type });
        const data = [new ClipboardItem({ [type]: blob })];
        await navigator.clipboard.write(data);
        alert("E-mail copiado! O Outlook abrirá em seguida.");
    } catch (err) {
        navigator.clipboard.writeText(emailContent.innerText);
    }
}

// --- FUNÇÃO PARA ABRIR OUTLOOK ---
async function abrirOutlook() {
    await copiarEmail();

    const motivo = document.getElementById('motivo').value;
    const valorFormatado = document.getElementById('valorCobranca').value; 

    // Assunto com Motivo e Valor
    const assunto = `${motivo} - Valor ICMS: R$ ${valorFormatado}`;
    
    const corpoInstrucao = "O detalhamento foi copiado para sua área de transferência.\n\nPor favor, pressione Ctrl + V aqui no corpo do e-mail para colar a tabela formatada.";

    const mailtoUrl = `mailto:?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpoInstrucao)}`;
    
    const linkTemporario = document.createElement('a');
    linkTemporario.href = mailtoUrl;
    linkTemporario.style.display = 'none';
    document.body.appendChild(linkTemporario);
    linkTemporario.click();
    document.body.removeChild(linkTemporario);
}
