
var Alphabet = require("./alphabet");
var Bindings = require("./dan-smith");

var tengwar = exports.tengwar = Bindings.tengwar;
var tehtar = exports.tehtar = Bindings.tehtar;

var positions = exports.positions = {

    "tinco": 2,
    "parma": 2,
    "calma": {
        "y": 1,
        "o-under": 1,
        "others": 2
    },
    "quesse": {
        "y": 1,
        "o-under": 1,
        "others": 2
    },

    "ando": {
        "wide": true,
        "others": 0
    },
    "umbar": {
        "wide": true,
        "others": 0
    },
    "anga": {
        "wide": true,
        "others": 0
    },
    "ungwe": {
        "wide": true,
        "others": 0
    },

    "thule": {
        "a": 3,
        "w": 3,
        "others": 2
    },
    "formen": {
        "a": 3,
        "w": 3,
        "others": 2
    },
    "harma": {
        "a": 0,
        "e": 0,
        "i": 1,
        "o": 1,
        "u": 1,
        "w": 0,
        "others": 1
    },
    "hwesta": {
        "a": 0,
        "e": 0,
        "i": 1,
        "o": 1,
        "u": 1,
        "w": 0,
        "others": 1
    },

    "anto": {
        "wide": true,
        "others": 0
    },
    "ampa": {
        "wide": true,
        "others": 0
    },
    "anca": {
        "wide": true,
        "others": 0
    },
    "unque": {
        "wide": true,
        "others": 0
    },

    "numen": {
        "wide": true,
        "others": 0
    },
    "malta": {
        "wide": true,
        "others": 0
    },
    "noldo": {
        "wide": true,
        "others": 0
    },
    "nwalme": {
        "wide": true,
        "others": 0
    },

    "ore": {
        "a": 1,
        "e": 2,
        "i": 1,
        "o": 2,
        "u": 3,
        "others": 1
    },
    "vala": {
        "a": 1,
        "e": 2,
        "i": 2,
        "o": 2,
        "w": 1,
        "y": 1,
        "others": 3
    },
    "anna": {
        "a": 1,
        "w": 3,
        "others": 2
    },
    "wilya": {
        "a": 1,
        "e": 1,
        "i": 2,
        "o": 1,
        "u": 1,
        "others": 1
    },

    "romen": {
        "a": 1,
        "e": 1,
        "i": 2,
        "o": 1,
        "u": 1,
        "y": 3,
        "o-under": null,
        "others": 1
    },
    "arda": {
        "a": 1,
        "e": 1,
        "i": 2,
        "o": 1,
        "u": 1,
        "w": 1,
        "y": null,
        "o-under": null,
        "others": 0
    },
    "lambe": {
        "wide": true,
        "e": 1,
        "y": 4,
        "w": 0,
        "o-under": null,
        "others": 0
    },
    "alda": {
        "wide": true,
        "w": 0,
        "y": null,
        "o-under": null,
        "others": 1
    },

    "silme": {
        "y": 2,
        "o-under": 2,
        "others": null
    },
    "silme-nuquerna": {
        "e": 2,
        "y": null,
        "o-under": null,
        "others": 1
    },
    "esse": {
        "others": null
    },
    "esse-nuquerna": {
        "e": 2,
        "y": null,
        "o-under": null,
        "others": 1
    },

    "hyarmen": {
        "y": 1,
        "others": 3
    },
    "hwesta-sindarinwa": {
        "w": 1,
        "y": 1,
        "others": 0
    },
    "yanta": {
        "a": 1,
        "others": 2
    },
    "ure": {
        "a": 1,
        "others": 2
    },

    "halla": {
        "others": null
    },
    "short-carrier": {
        "y": null,
        "others": 3
    },
    "long-carrier": {
        "y": null,
        "o-under": null,
        "others": 3
    },
    "round-carrier": 2,

    "tinco-extended": {
        "a": 3,
        "w": 3,
        "y": 3,
        "others": 2
    },
    "parma-extended": {
        "a": 3,
        "w": 3,
        "y": 3,
        "others": 2
    },
    "calma-extended": {
        "i": 1,
        "w": 1,
        "y": 0,
        "others": 0
    },
    "quesse-extended": {
        "i": 1,
        "w": 1,
        "y": 0,
        "others": 0
    }

};

exports.transcribe = transcribe;
function transcribe(sections, options) {
    options = options || {};
    var plain = options.plain || false;
    var block = options.block || false;
    var beginParagraph = block ? "<p>" : "";
    var delimitParagraph = block ? "<br>" : "";
    var endParagraph = block ? "</p>" : "";
    return sections.map(function (section) {
        return section.map(function (paragraph) {
            return beginParagraph + paragraph.map(function (line) {
                return line.map(function (word) {
                    return word.map(function (column) {
                        var tengwa = column.tengwa || "anna";
                        var tehtar = [];
                        if (column.above) tehtar.push(column.above);
                        if (column.below) tehtar.push(column.below);
                        if (column.tildeBelow) tehtar.push("tilde-below");
                        if (column.tildeAbove) tehtar.push("tilde-above");
                        if (column.following) tehtar.push(column.following);
                        var html = tengwar[tengwa] + tehtar.map(function (tehta) {
                            return tehtaForTengwa(tengwa, tehta);
                        }).join("");
                        if (column.errors && !plain) {
                            html = "<abbr class=\"error\" title=\"" + column.errors.join("\n").replace(/"/g, "&quot;") + "\">" + html + "</abbr>";
                        }
                        return html;
                    }).join("");
                }).join(" ");;
            }).join(delimitParagraph + "\n") + endParagraph;
        }).join("\n\n");
    }).join("\n\n\n");
}

exports.tehtaForTengwa = tehtaForTengwa;
function tehtaForTengwa(tengwa, tehta) {
    var tehtaKey = tehtaKeyForTengwa(tengwa, tehta);
    if (tehtaKey == null)
        return null;
    return (
        tehtar[tehta][tengwa] ||
        tehtar[tehta][tehtaKey] ||
        null
    );
}

var longVowels = "áéíóú";
function tehtaKeyForTengwa(tengwa, tehta) {
    if (!tehtar[tehta])
        return null;
    if (longVowels.indexOf(tehta) !== -1)
        return null;
    if (tehtar[tehta].special)
        return tehtar[tehta][tengwa] || null;
    if (Alphabet.barsAndTildes.indexOf(tehta) !== -1) {
        if (tengwa === "lambe" || tengwa === "alda" && tehtar[tehta].length >= 2)
            return 2;
        return positions[tengwa].wide ? 0 : 1;
    }
    if (positions[tengwa] == null)
        return null;
    if (positions[tengwa][tehta] === null)
        return null;
    if (positions[tengwa][tehta] != null)
        return positions[tengwa][tehta];
    if (positions[tengwa].others != null)
        return positions[tengwa].others;
    return positions[tengwa];
}

exports.makeColumn = makeColumn;
function makeColumn(tengwa, above, below) {
    return new Column(tengwa, above, below);
};

var Column = function (tengwa, above, below) {
    this.above = above;
    this.tildeAbove = void 0;
    this.tengwa = tengwa;
    this.tildeBelow = void 0;
    this.below = below;
    this.following = void 0;
    this.error = void 0;
};

Column.prototype.canAddAbove = function (tehta) {
    return (
        !this.above && !!tehtaForTengwa(this.tengwa, tehta)
    ) || ( // or flip it
        !this.below && (
            this.tengwa === "silme" && tehtaForTengwa("silme-nuquerna", tehta) ||
            this.tengwa === "esse" && tehtaForTengwa("esse-nuquerna", tehta)
        )
    );
};

Column.prototype.addAbove = function (above) {
    if (this.tengwa === "silme") {
        this.tengwa = "silme-nuquerna";
    }
    if (this.tengwa === "esse") {
        this.tengwa = "esse-nuquerna";
    }
    this.above = above;
    return this;
};

Column.prototype.canAddBelow = function (tehta) {
    return !this.below && !!tehtaForTengwa(this.tengwa, tehta);
};

Column.prototype.addBelow = function (below) {
    this.below = below;
    return this;
};

Column.prototype.addTildeAbove = function () {
    this.tildeAbove = true;
    return this;
};

Column.prototype.addTildeBelow = function () {
    this.tildeBelow = true;
    return this;
};

Column.prototype.canAddFollowing = function (following) {
    return !this.following && !!tehtaForTengwa(this.tengwa, following);
};

Column.prototype.addFollowing = function (following) {
    this.following = following;
    return this;
};

Column.prototype.addError = function (error) {
    this.errors = this.errors || [];
    this.errors.push(error);
    return this;
};

