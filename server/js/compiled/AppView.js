// Generated by CoffeeScript 1.6.2
(function() {
  ' Handles all frontend setup for UI.';
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.AppView = (function(_super) {
    __extends(AppView, _super);

    function AppView() {
      this.getAlternativeServerID = __bind(this.getAlternativeServerID, this);
      this.goToInvalidIDPage = __bind(this.goToInvalidIDPage, this);
      this.goToUnavailableIDPage = __bind(this.goToUnavailableIDPage, this);
      this.goToDatabasePage = __bind(this.goToDatabasePage, this);
      this.goToEditPage = __bind(this.goToEditPage, this);
      this.goToPage = __bind(this.goToPage, this);
      this.renderTopbarButtons = __bind(this.renderTopbarButtons, this);
      this.setClientBrowserLink = __bind(this.setClientBrowserLink, this);      _ref = AppView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    AppView.prototype.el = "#client-server";

    AppView.prototype.initialize = function(options) {
      var _this = this;

      this.serverFileCollection = options.serverFileCollection;
      this.routeCollection = options.routeCollection;
      this.userDatabase = options.userDatabase;
      this.tmplEditPage = Handlebars.templates["edit-page"];
      this.tmplDatabasePage = Handlebars.templates["database-page"];
      this.tmplTopbarButtons = Handlebars.templates["topbar-buttons"];
      this.tmplServerIDMessage = Handlebars.templates["server-id-message"];
      this.routeMap = {
        "edit": this.goToEditPage,
        "database": this.goToDatabasePage
      };
      this.routeDefault = "edit";
      this.routeCurrent = "";
      this.on("setServerID", this.setClientBrowserLink);
      this.on("onUnavailableID", this.goToUnavailableIDPage);
      this.on("onInvalidID", this.goToInvalidIDPage);
      return $(window).on("hashchange", function() {
        return _this.goToPage();
      });
    };

    AppView.prototype.setClientBrowserLink = function(serverID) {
      var link;

      this.serverID = serverID;
      this.goToPage();
      link = window.location.origin + "/connect/" + serverID + "/";
      return this.clientBrowserLink.attr("href", link);
    };

    AppView.prototype.renderTopbarButtons = function() {
      $(".topbar-buttons").remove();
      $(".topbar").append(this.tmplTopbarButtons);
      this.clientBrowserLink = $(".navbar .browse");
      return this.archiveButton = $(".navbar .archive");
    };

    AppView.prototype.goToPage = function(slug) {
      if (slug) {
        location.hash = "#" + slug;
      } else {
        slug = location.hash.replace("#", "");
      }
      if (!this.routeMap[slug]) {
        slug = this.routeDefault;
      }
      if (slug === this.routeCurrent) {
        return;
      }
      this.routeCurrent = slug;
      return this.routeMap[slug]();
    };

    AppView.prototype.goToEditPage = function() {
      this.renderTopbarButtons();
      $(this.el).html(this.tmplEditPage);
      this.serverFileCollectionView = new ClientServerCollectionView({
        serverFileCollection: this.serverFileCollection,
        routeCollection: this.routeCollection,
        userDatabase: this.userDatabase
      });
      return this.archiver = new ClientServerArchiver({
        serverName: this.serverID,
        serverFileCollection: this.serverFileCollection,
        routeCollection: this.routeCollection,
        userDatabase: this.userDatabase,
        button: this.archiveButton
      });
    };

    AppView.prototype.goToDatabasePage = function() {
      this.renderTopbarButtons();
      $(this.el).html(this.tmplDatabasePage());
      return this.databaseView = new DatabaseView({
        userDatabase: this.userDatabase
      });
    };

    AppView.prototype.goToUnavailableIDPage = function(desiredServerID) {
      $(".topbar-buttons").remove();
      return $(this.el).html(this.tmplServerIDMessage({
        message: "\"" + desiredServerID + "\" is unavailable.",
        alternativeServerID: this.getAlternativeServerID()
      }));
    };

    AppView.prototype.goToInvalidIDPage = function(desiredServerID) {
      $(".topbar-buttons").remove();
      return $(this.el).html(this.tmplServerIDMessage({
        message: "\"" + desiredServerID + "\" is an invalid server name.",
        alternativeServerID: this.getAlternativeServerID()
      }));
    };

    AppView.prototype.getAlternativeServerID = function() {
      var randomIndex;

      randomIndex = Math.floor(Math.random() * AppView.listOfDogBreeds.length);
      return AppView.listOfDogBreeds[randomIndex];
    };

    AppView.listOfDogBreeds = ["AfghanHound", "Aidi", "AiredaleTerrier", "AkbashDog", "AkitaInu", "AlanoEspanol", "AlaskanKlee", "AlaskanMalamute", "AlpineDachsbracke", "AlpineSpaniel", "AmericanAkita", "AmericanBulldog", "AmericanCocker", "AmericanEskimo", "AmericanFoxhound", "AmericanHairless", "AmericanMastiff", "AmericanPit", "AmericanStaffordshire", "AmericanWater", "AnatolianShepherd", "AngloFrancaisde", "AppenzellerSennenhund", "AriegePointer", "Ariegeois", "Armant", "ArmenianGampr", "ArtoisHound", "AustralianCattle", "AustralianKelpie", "AustralianShepherd", "AustralianSilky", "AustralianStumpy", "AustralianTerrier", "AustrianBlack", "AustrianPinscher", "Azawakh", "Barbet", "Basenji", "BasqueShepherd", "BassetArtesien", "BassetBleu", "BassetFauve", "GrandBasset", "PetitBasset", "BassetHound", "BavarianMountain", "Beagle", "BeagleHarrier", "BeardedCollie", "Beauceron", "BedlingtonTerrier", "BelgianShepherd", "BelgianShepherd", "BelgianShepherd", "BelgianShepherd", "BergamascoShepherd", "BergerBlanc", "BergerPicard", "BernerLaufhund", "BerneseMountain", "BichonFrise", "Billy", "Blackand", "Blackand", "Bullenbeisser", "BlackNorwegian", "BlackRussian", "BlackmouthCur", "GrandBleu", "PetitBleu", "Bloodhound", "BlueLacy", "BluePaul", "BluetickCoonhound", "Boerboel", "BohemianShepherd", "Bolognese", "BorderCollie", "BorderTerrier", "Borzoi", "BosnianCoarsehaired", "BostonTerrier", "Bouvierdes", "Bouvierdes", "Boxer", "BoykinSpaniel", "BraccoItaliano", "BraquedAuvergne", "Braquedu", "Braquedu", "BraqueFrancais", "BraqueSaintGermain", "BrazilianTerrier", "Briard", "BriquetGriffon", "Brittany", "Broholmer", "BrunoJura", "BucovinaShepherd", "Bulland", "BullTerrier", "BullTerrier", "Bulldog", "Bullmastiff", "BullyKutta", "BurgosPointer", "CanaanDog", "CanadianEskimo", "CaneCorso", "Caoda", "Caode", "CaoFila", "CarolinaDog", "CarpathianShepherd", "CatahoulaCur", "CatalanSheepdog", "CaucasianShepherd", "CavalierKing", "CentralAsian", "CeskyFousek", "CeskyTerrier", "ChesapeakeBay", "ChienFrancais", "Chiengris", "Chihuahua", "ChileanFox", "ChineseChongqing", "ChineseCrested", "ChineseImperial", "Chinook", "Chippiparai", "ChowChow", "CiernySery", "CimarronUruguayo", "CirnecodellEtna", "ClumberSpaniel", "RoughCollie", "SmoothCollie", "Combai", "CordobaFighting", "Cotonde", "CretanHound", "CroatianSheepdog", "CumberlandSheepdog", "CurlyCoated", "Cursinu", "CzechoslovakWolfdog", "Dalmatian", "DandieDinmont", "DanishSwedish", "DeutscheBracke", "DobermanPinscher", "DogoArgentino", "DogoCubano", "Doguede", "DrentsePatrijshond", "Drever", "Dunker", "DutchShepherd", "DutchSmoushond", "EastEuropeanShepherd", "Elo", "EnglishCocker", "EnglishCoonhound", "EnglishFoxhound", "EnglishMastiff", "EnglishSetter", "EnglishShepherd", "EnglishSpringer", "EnglishToy", "EnglishWater", "EnglishWhite", "EntlebucherMountain", "EpagneulBleu", "EstonianHound", "EstrelaMountain", "Eurasier", "FilaBrasileiro", "FinnishHound", "FinnishLapphund", "FinnishSpitz", "FlatCoatedRetriever", "FormosanMountain", "FoxTerrier", "WireFox", "FrenchBrittany", "FrenchBulldog", "FrenchSpaniel", "GasconSaintongeois", "Georgianshepherd", "GermanLonghaired", "GermanPinscher", "GermanRoughhaired", "GermanShepherd", "GermanShorthaired", "GermanSpaniel", "GermanSpitz", "GermanWirehaired", "GiantSchnauzer", "Glenof", "GoldenRetriever", "GordonSetter", "GranMastin", "GrandAngloFrancais", "GrandGriffon", "GreatDane", "GreatPyrenees", "GreaterSwiss", "GreekHarehound", "GreenlandDog", "Greyhound", "GriffonBleu", "GriffonBruxellois", "GriffonFauve", "GriffonNivernais", "HanoverHound", "HareIndian", "Harrier", "Havanese", "HawaiianPoi", "HimalayanSheepdog", "Hokkaido", "HortayaBorzaya", "Hovawart", "HungarianHound", "Huntaway", "Hygenhund", "IcelandicSheepdog", "IndianSpitz", "IrishRed", "IrishSetter", "IrishTerrier", "IrishWater", "IrishWolfhound", "IstrianCoarsehaired", "IstrianShorthaired", "ItalianGreyhound", "Jagdterrier", "Jamthund", "JapaneseChin", "JapaneseSpitz", "JapaneseTerrier", "KaiKen", "KangalDog", "Kanni", "KarakachanDog", "KarelianBear", "KarstShepherd", "Keeshond", "KerryBeagle", "KerryBlue", "KingCharles", "KingShepherd", "Kintamani", "Kishu", "Komondor", "Kooikerhondje", "Koolie", "KoreanJindo", "Kromfohrlander", "KunmingWolfdog", "Kuri", "Kuvasz", "KyiLeo", "LabradorRetriever", "LagottoRomagnolo", "LakelandTerrier", "LancashireHeeler", "Landseer", "LapponianHerder", "Leonberger", "LhasaApso", "LithuanianHound", "LonghairedWhippet", "Lowchen", "Maltese", "ManchesterTerrier", "MaremmaSheepdog", "McNab", "MexicanHairless", "MiniatureAustralian", "MiniatureAmerican", "MiniatureFox", "MiniaturePinscher", "MiniatureSchnauzer", "Mioritic", "Molossus", "MontenegrinMountain", "MoscowWatchdog", "MoscowWater", "MountainCur", "Mucuchies", "MudholHound", "Mudi", "LargeMunsterlander", "SmallMunsterlander", "Newfoundland", "NewZealand", "NorfolkSpaniel", "NorfolkTerrier", "Norrbottenspets", "NorthCountry", "NorthernInuit", "NorwegianBuhund", "NorwegianElkhound", "NorwegianLundehund", "NorwichTerrier", "NovaScotia", "OldDanish", "OldEnglish", "OldGerman", "Oldtime", "OldeEnglish", "Otterhound", "PaisleyTerrier", "Papillon", "ParsonRussell", "PatterdaleTerrier", "Pekingese", "Perrode", "Perrode", "PeruvianHairless", "Phalene", "PharaohHound", "PhuQuoc", "PicardySpaniel", "PlottHound", "PodencoCanario", "Pointer", "PolishGreyhound", "PolishHound", "PolishHunting", "PolishLowland", "PolishTatra", "Pomeranian", "PontAudemerSpaniel", "Poodle", "Porcelaine", "PortuguesePodengo", "PortuguesePointer", "PortugueseWater", "PosavacHound", "PrazskyKrysarik", "Pudelpointer", "Pug", "Puli", "Pumi", "PungsanDog", "PyreneanMastiff", "PyreneanShepherd", "Rajapalayam", "RampurGreyhound", "RastreadorBrasileiro", "RatoneroBodeguero", "RatoneroValenciano", "RatTerrier", "RedboneCoonhound", "RhodesianRidgeback", "Rottweiler", "RussianSpaniel", "RussianToy", "Russiantracker", "RussoEuropeanLaika", "RussellTerrier", "SabuesoEspanol", "SaintUsugeSpaniel", "SakhalinHusky", "Saluki", "Samoyed", "Sapsali", "Šarplaninac", "Schapendoes", "Schillerstövare", "Schipperke", "StandardSchnauzer", "SchweizerLaufhund", "SchweizerischerNiederlaufhund", "ScotchCollie", "ScottishDeerhound", "ScottishTerrier", "SealyhamTerrier", "SegugioItaliano", "SeppalaSiberian", "SerbianHound", "SerbianTricolour", "SharPei", "ShetlandSheepdog", "ShibaInu", "ShihTzu", "Shikoku", "ShilohShepherd", "SiberianHusky", "SilkenWindhound", "SinhalaHound", "SkyeTerrier", "Sloughi", "SlovakCuvac", "SlovakianRoughhaired", "SlovenskKopov", "Smalandsstovare", "SmallGreek", "SoftCoatedWheaten", "SouthRussian", "SouthernHound", "SpanishMastiff", "SpanishWater", "SpinoneItaliano", "SportingLucas", "StBernard", "StJohns", "Stabyhoun", "StaffordshireBull", "StephensCur", "StyrianCoarsehaired", "SussexSpaniel", "SwedishLapphund", "SwedishVallhund", "Taigan", "Talbot", "TamaskanDog", "TeddyRoosevelt", "Telomian", "TennesseeTreeing", "TenterfieldTerrier", "ThaiBangkaew", "ThaiRidgeback", "TibetanMastiff", "TibetanSpaniel", "TibetanTerrier", "Tornjak", "Tosa", "ToyBulldog", "ToyFox", "ToyManchester", "ToyTrawler", "TransylvanianHound", "TreeingCur", "TreeingWalker", "TriggHound", "TweedWater", "TyroleanHound", "VolpinoItaliano", "CardiganWelsh", "PembrokeWelsh", "WelshSheepdog", "WelshSpringer", "WelshTerrier", "WestHighland", "WestSiberian", "WestphalianDachsbracke", "Wetterhoun", "Whippet", "WhiteShepherd", "WirehairedPointing", "WirehairedVizsla"];

    return AppView;

  })(Backbone.View);

}).call(this);

/*
//@ sourceMappingURL=AppView.map
*/
