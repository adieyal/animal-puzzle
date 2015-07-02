var ELEPHANT = 1,
    RHINO = 4,
    SPRINGBOK = 16,
    ZEBRA = 64,
    LION = 256,
    BLANK = 1024;

var NUM_ORIENTATIONS = 4 * 4 * 4 * 4;
var grid1 = [ELEPHANT, BLANK, LION, ZEBRA, SPRINGBOK, ZEBRA, RHINO, LION, ELEPHANT];
var grid2 = [SPRINGBOK, BLANK, LION, BLANK, ZEBRA, ELEPHANT, LION, RHINO, SPRINGBOK];
var grid3 = [RHINO, ELEPHANT, ZEBRA, SPRINGBOK, BLANK, SPRINGBOK, LION, BLANK, RHINO];
var grid4 = [BLANK, BLANK, BLANK, BLANK, RHINO, LION, SPRINGBOK, ELEPHANT, ZEBRA];

var shape1a = [0, 0, 1, 0, 0, 0, 0, 1, 0];
var shape1b = [0, 0, 0, 1, 0, 0, 0, 0, 1];
var shape1c = [0, 1, 0, 0, 0, 0, 1, 0, 0];
var shape1d = [1, 0, 0, 0, 0, 1, 0, 0, 0];

var shape1 = [shape1a, shape1b, shape1c, shape1d];

var shape2a = [0, 1, 0, 0, 0, 0, 0, 1, 0];
var shape2b = [0, 0, 0, 1, 0, 1, 0, 0, 0];
var shape2c = [0, 1, 0, 0, 0, 0, 0, 1, 0];
var shape2d = [0, 0, 0, 1, 0, 1, 0, 0, 0];

var shape2 = [shape2a, shape2b, shape2c, shape2d];

var shape3a = [0, 0, 1, 1, 0, 0, 1, 0, 0];
var shape3b = [1, 1, 0, 0, 0, 0, 0, 0, 1];
var shape3c = [0, 0, 1, 0, 0, 1, 1, 0, 0];
var shape3d = [1, 0, 0, 0, 0, 0, 0, 1, 1];

var shape3 = [shape3a, shape3b, shape3c, shape3d];

var shape4a = [0, 0, 0, 0, 1, 1, 0, 0, 0];
var shape4b = [0, 0, 0, 0, 1, 0, 0, 1, 0];
var shape4c = [0, 0, 0, 1, 1, 0, 0, 0, 0];
var shape4d = [0, 1, 0, 0, 1, 0, 0, 0, 0];

var shape4 = [shape4a, shape4b, shape4c, shape4d];

var combinations = [
    [0, 1, 2, 3],
    [0, 1, 3, 2],
    [0, 2, 1, 3],
    [0, 2, 3, 1],
    [0, 3, 1, 2],
    [0, 3, 2, 1],
    [1, 0, 2, 3],
    [1, 0, 3, 2],
    [1, 2, 0, 3],
    [1, 2, 3, 0],
    [1, 3, 0, 2],
    [1, 3, 2, 0],
    [2, 0, 1, 3],
    [2, 0, 3, 1],
    [2, 1, 0, 3],
    [2, 1, 3, 0],
    [2, 3, 0, 1],
    [2, 3, 1, 0],
    [3, 0, 1, 2],
    [3, 0, 2, 1],
    [3, 1, 0, 2],
    [3, 1, 2, 0],
    [3, 2, 0, 1],
    [3, 2, 1, 0],
]

var challenge_1 = [ELEPHANT, ELEPHANT, ELEPHANT, ELEPHANT, ELEPHANT]
var challenge_new = [LION, LION, LION, LION, LION]
var challenge_19 = [ZEBRA, ELEPHANT, ZEBRA, ZEBRA, ZEBRA, ZEBRA, ELEPHANT]
var challenge_35 = [RHINO, RHINO, RHINO, ELEPHANT, ELEPHANT, LION, LION, LION]
var challenge_39 = [RHINO, RHINO, SPRINGBOK, SPRINGBOK, ELEPHANT, ELEPHANT, ELEPHANT]
var challenge_41 = [ELEPHANT, ELEPHANT, LION, SPRINGBOK, LION, ELEPHANT, ELEPHANT]
var challenge_42 = [ZEBRA, SPRINGBOK, ZEBRA, ELEPHANT, ZEBRA, ZEBRA]
var challenge_48 = [SPRINGBOK, ELEPHANT, RHINO, ZEBRA, ELEPHANT, SPRINGBOK, LION, ELEPHANT]

var Puzzle = function(node) {
    this.node = node;
    d3.xml('img/animals.svg', function(xml) {
        var importedNode = document.importNode(xml.documentElement, true);
        console.log(node);
        var donor = d3.select(node[0][0].appendChild(importedNode.cloneNode(true)));
    });
}

Puzzle.prototype = {
    set_tile : function(grid, x, y, value) {
        var tile = d3.select('#tile_' + grid + '_' + x + '_' + y)
        tile.attr('xlink:href', '#tile_' + value);
    },

    reset_grid : function() {
        this.set_tile(1, 1, 1, 'elephant');
        this.set_tile(1, 2, 1, 'blank');
        this.set_tile(1, 3, 1, 'lion');
        this.set_tile(1, 1, 2, 'zebra');
        this.set_tile(1, 2, 2, 'bok');
        this.set_tile(1, 3, 2, 'zebra');
        this.set_tile(1, 1, 3, 'rhino');
        this.set_tile(1, 2, 3, 'lion');
        this.set_tile(1, 3, 3, 'elephant');

        this.set_tile(2, 1, 1, 'bok');
        this.set_tile(2, 2, 1, 'blank');
        this.set_tile(2, 3, 1, 'lion');
        this.set_tile(2, 1, 2, 'blank');
        this.set_tile(2, 2, 2, 'zebra');
        this.set_tile(2, 3, 2, 'elephant');
        this.set_tile(2, 1, 3, 'lion');
        this.set_tile(2, 2, 3, 'rhino');
        this.set_tile(2, 3, 3, 'bok');

        this.set_tile(3, 1, 1, 'rhino');
        this.set_tile(3, 2, 1, 'elephant');
        this.set_tile(3, 3, 1, 'zebra');
        this.set_tile(3, 1, 2, 'bok');
        this.set_tile(3, 2, 2, 'blank');
        this.set_tile(3, 3, 2, 'bok');
        this.set_tile(3, 1, 3, 'lion');
        this.set_tile(3, 2, 3, 'blank');
        this.set_tile(3, 3, 3, 'rhino');

        this.set_tile(4, 1, 1, 'blank');
        this.set_tile(4, 2, 1, 'blank');
        this.set_tile(4, 3, 1, 'blank');
        this.set_tile(4, 1, 2, 'blank');
        this.set_tile(4, 2, 2, 'rhino');
        this.set_tile(4, 3, 2, 'lion');
        this.set_tile(4, 1, 3, 'bok');
        this.set_tile(4, 2, 3, 'elephant');
        this.set_tile(4, 3, 3, 'zebra');
    },

    cover_tile : function(main_tile, x, y) {
        this.set_tile(main_tile, x, y, 'covered');
    },

    solve : function(challenge) {
        var me = this;

        var fill_challenge = function(challenge) {
            var tmp_challenge = [];
            for (var i = 0; i < 9; i++) {
                if (i < challenge.length) 
                    tmp_challenge.push(challenge[i]);
                else
                    tmp_challenge.push(BLANK)
            }
            return tmp_challenge;
        } 

        var get_orientation = function(i) {
            var idx_sq1 = Math.floor(i / 64);
            i = i - idx_sq1 * 64;

            var idx_sq2 = Math.floor(i / 16);
            i = i - idx_sq2 * 16;

            var idx_sq3 = Math.floor(i / 4);
            var idx_sq4 = i - idx_sq3 * 4;

            sq1 = shape1[idx_sq1];
            sq2 = shape2[idx_sq2];
            sq3 = shape3[idx_sq3];
            sq4 = shape4[idx_sq4];

            return [sq1, sq2, sq3, sq4];
        }

        var shuffle_shapes = function(orientations, combination) {
            c = combination;
            return [
                orientations[c[0]], orientations[c[1]],
                orientations[c[2]], orientations[c[3]]
            ];
        }

        var mask_animals = function(orientations) {
            return [
                me.multiply(grid1, orientations[0]),
                me.multiply(grid2, orientations[1]),
                me.multiply(grid3, orientations[2]),
                me.multiply(grid4, orientations[3])
            ];
        }

        var cover_tiles = function(masked) {
            me.reset_grid();
            for (var mask_idx = 0; mask_idx < masked.length; mask_idx++) {
                mask = masked[mask_idx];
                for (j = 0; j < mask.length; j++) {
                    if (mask[j] == 0) {
                        me.cover_tile(mask_idx + 1, j % 3 + 1, Math.floor(j / 3) + 1);
                    }
                }
            }
        }

        function* generator() {
            for (var i = 0; i < NUM_ORIENTATIONS; i++) {
                orientations = get_orientation(i);

                for (idx in combinations) {
                    c = combinations[idx];
                    orientations2 = shuffle_shapes(orientations, c);
                    masked = mask_animals(orientations2);
                    yield masked;
                }
            }
        }

        function is_found(masked, challenge) {
            var sort_func = function(a, b) { return parseInt(a) - parseInt(b) };
            var squeeze_zeros = function(el) { return el > 0; };

            var grid_animals = [].concat(masked[0], masked[1], masked[2], masked[3]);
            grid_animals = grid_animals.filter(squeeze_zeros);
            grid_animals.sort(sort_func);
            challenge.sort(sort_func);
            
            return grid_animals.length == challenge.length && grid_animals.every(
                function(v,i) {
                    return v === challenge[i]
                }
            )
        }

        function next_frame() {
            res = iterator.next();
            if (res.done === true) {
                me.reset_grid();
                console.log('NOT FOUND');
                return;
            }

            masked = res.value;

            cover_tiles(masked);
            if (is_found(masked, challenge)) {
                console.log("FOUND");
                return;
            }
            console.log("NEXT FRAME");
            setTimeout(next_frame, 100);
        }

        challenge = fill_challenge(challenge);
        var iterator = generator();
        next_frame();

        
    },
    multiply : function(g1, g2) {
        ret = [];
        for (el in g1) {
            ret.push(g1[el] * g2[el]);
        }
        return ret;
    }
}

