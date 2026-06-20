import type { Player } from '@/lib/types'

// Compact factory to keep the database dense and readable.
function p(
  name: string,
  rating: number,
  position: Player['position'],
  nation: string,
  flag: string,
  team: string,
  era: Player['era'],
  type: Player['type'],
  rarity: Player['rarity'] = 'rare',
  altPositions: Player['position'][] = [],
): Player {
  return {
    id: name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + rating,
    name,
    rating,
    position,
    altPositions,
    nation,
    flag,
    team,
    era,
    type,
    rarity,
  }
}

export const PLAYERS: Player[] = [
  // ---------- 70s ----------
  p('Pelé', 95, 'CF', 'Brazil', '🇧🇷', 'Brazil', '70s', 'national', 'icon', ['ST', 'CAM']),
  p('Franz Beckenbauer', 93, 'CB', 'Germany', '🇩🇪', 'West Germany', '70s', 'national', 'icon', ['CDM']),
  p('Johan Cruyff', 94, 'CF', 'Netherlands', '🇳🇱', 'Netherlands', '70s', 'national', 'icon', ['CAM', 'LW']),
  p('Gerd Müller', 92, 'ST', 'Germany', '🇩🇪', 'West Germany', '70s', 'national', 'icon'),
  p('Gianni Rivera', 89, 'CAM', 'Italy', '🇮🇹', 'Italy', '70s', 'national', 'epic'),
  p('Dino Zoff', 90, 'GK', 'Italy', '🇮🇹', 'Italy', '70s', 'national', 'epic'),
  p('Carlos Alberto', 89, 'RB', 'Brazil', '🇧🇷', 'Brazil', '70s', 'national', 'epic'),
  p('Jairzinho', 88, 'RW', 'Brazil', '🇧🇷', 'Brazil', '70s', 'national', 'rare'),

  // ---------- 80s ----------
  p('Diego Maradona', 95, 'CAM', 'Argentina', '🇦🇷', 'Argentina', '80s', 'national', 'icon', ['CF', 'LW']),
  p('Michel Platini', 92, 'CAM', 'France', '🇫🇷', 'France', '80s', 'national', 'icon'),
  p('Zico', 91, 'CAM', 'Brazil', '🇧🇷', 'Brazil', '80s', 'national', 'hero'),
  p('Marco van Basten', 92, 'ST', 'Netherlands', '🇳🇱', 'AC Milan', '80s', 'club', 'icon'),
  p('Rudi Völler', 91, 'ST', 'Germany', '🇩🇪', 'West Germany', '80s', 'national', 'hero'),
  p('Klaus Augenthaler', 89, 'CB', 'Germany', '🇩🇪', 'West Germany', '80s', 'national', 'epic'),
  p('Lothar Matthäus', 92, 'CM', 'Germany', '🇩🇪', 'West Germany', '80s', 'national', 'icon', ['CDM', 'CB']),
  p('Paolo Maldini', 93, 'LB', 'Italy', '🇮🇹', 'AC Milan', '80s', 'club', 'icon', ['CB']),
  p('Ruud Gullit', 91, 'CAM', 'Netherlands', '🇳🇱', 'AC Milan', '80s', 'club', 'hero', ['ST']),
  p('Socrates', 89, 'CM', 'Brazil', '🇧🇷', 'Brazil', '80s', 'national', 'epic'),
  p('Gary Lineker', 88, 'ST', 'England', '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'England', '80s', 'national', 'rare'),
  p('Preben Elkjær', 86, 'ST', 'Denmark', '🇩🇰', 'Denmark', '80s', 'national', 'rare'),

  // ---------- 90s ----------
  p('Ronaldo Nazário', 95, 'ST', 'Brazil', '🇧🇷', 'Brazil', '90s', 'national', 'icon', ['CF']),
  p('Zinedine Zidane', 94, 'CAM', 'France', '🇫🇷', 'France', '90s', 'national', 'icon', ['CM']),
  p('Roberto Baggio', 92, 'CF', 'Italy', '🇮🇹', 'Italy', '90s', 'national', 'icon', ['CAM']),
  p('Jürgen Klinsmann', 92, 'ST', 'Germany', '🇩🇪', 'Germany', '90s', 'national', 'hero'),
  p('Thomas Häßler', 90, 'CAM', 'Germany', '🇩🇪', 'Germany', '90s', 'national', 'epic', ['RM']),
  p('Gabriel Batistuta', 91, 'ST', 'Argentina', '🇦🇷', 'Argentina', '90s', 'national', 'hero'),
  p('Romário', 92, 'ST', 'Brazil', '🇧🇷', 'Brazil', '90s', 'national', 'icon'),
  p('George Weah', 91, 'ST', 'Liberia', '🇱🇷', 'AC Milan', '90s', 'club', 'hero'),
  p('Alessandro Del Piero', 91, 'CF', 'Italy', '🇮🇹', 'Juventus', '90s', 'club', 'hero', ['ST']),
  p('Paolo Cannavaro', 88, 'CB', 'Italy', '🇮🇹', 'Italy', '90s', 'national', 'rare'),
  p('Fabio Cannavaro', 91, 'CB', 'Italy', '🇮🇹', 'Italy', '90s', 'national', 'hero'),
  p('Edgar Davids', 89, 'CDM', 'Netherlands', '🇳🇱', 'Juventus', '90s', 'club', 'epic', ['CM']),
  p('Dennis Bergkamp', 91, 'CF', 'Netherlands', '🇳🇱', 'Arsenal', '90s', 'club', 'hero', ['CAM']),
  p('Davor Šuker', 89, 'ST', 'Croatia', '🇭🇷', 'Croatia', '90s', 'national', 'epic'),
  p('Hristo Stoichkov', 90, 'LW', 'Bulgaria', '🇧🇬', 'Barcelona', '90s', 'club', 'hero', ['ST']),
  p('Peter Schmeichel', 91, 'GK', 'Denmark', '🇩🇰', 'Man United', '90s', 'club', 'hero'),
  p('Eric Cantona', 90, 'CF', 'France', '🇫🇷', 'Man United', '90s', 'club', 'epic'),

  // ---------- 00s ----------
  p('Ronaldinho', 94, 'CAM', 'Brazil', '🇧🇷', 'Barcelona', '00s', 'club', 'icon', ['LW']),
  p('Thierry Henry', 93, 'ST', 'France', '🇫🇷', 'Arsenal', '00s', 'club', 'icon', ['LW']),
  p('Andrea Pirlo', 91, 'CM', 'Italy', '🇮🇹', 'AC Milan', '00s', 'club', 'hero', ['CDM']),
  p('Kaká', 92, 'CAM', 'Brazil', '🇧🇷', 'AC Milan', '00s', 'club', 'icon'),
  p('Steven Gerrard', 91, 'CM', 'England', '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'Liverpool', '00s', 'club', 'hero', ['CAM']),
  p('Frank Lampard', 90, 'CM', 'England', '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'Chelsea', '00s', 'club', 'epic'),
  p('Xavi', 92, 'CM', 'Spain', '🇪🇸', 'Barcelona', '00s', 'club', 'icon'),
  p('Carles Puyol', 90, 'CB', 'Spain', '🇪🇸', 'Barcelona', '00s', 'club', 'hero'),
  p('Gerard Piqué', 88, 'CB', 'Spain', '🇪🇸', 'Barcelona', '00s', 'club', 'rare'),
  p('Andrés Iniesta', 92, 'CM', 'Spain', '🇪🇸', 'Barcelona', '00s', 'club', 'icon', ['CAM']),
  p('Samuel Eto\u2019o', 91, 'ST', 'Cameroon', '🇨🇲', 'Barcelona', '00s', 'club', 'hero'),
  p('Didier Drogba', 91, 'ST', 'Ivory Coast', '🇨🇮', 'Chelsea', '00s', 'club', 'hero'),
  p('Francesco Totti', 91, 'CF', 'Italy', '🇮🇹', 'Roma', '00s', 'club', 'hero', ['CAM']),
  p('Wayne Rooney', 90, 'ST', 'England', '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'Man United', '00s', 'club', 'epic', ['CF']),
  p('Iker Casillas', 91, 'GK', 'Spain', '🇪🇸', 'Real Madrid', '00s', 'club', 'hero'),
  p('Gianluigi Buffon', 92, 'GK', 'Italy', '🇮🇹', 'Juventus', '00s', 'club', 'icon'),
  p('Cafu', 89, 'RB', 'Brazil', '🇧🇷', 'AC Milan', '00s', 'club', 'epic'),
  p('Roberto Carlos', 90, 'LB', 'Brazil', '🇧🇷', 'Real Madrid', '00s', 'club', 'hero', ['LWB']),

  // ---------- 10s ----------
  p('Lionel Messi', 95, 'RW', 'Argentina', '🇦🇷', 'Barcelona', '10s', 'club', 'icon', ['CAM', 'CF']),
  p('Cristiano Ronaldo', 95, 'ST', 'Portugal', '🇵🇹', 'Real Madrid', '10s', 'club', 'icon', ['LW']),
  p('Sergio Ramos', 91, 'CB', 'Spain', '🇪🇸', 'Real Madrid', '10s', 'club', 'hero', ['RB']),
  p('Luka Modrić', 91, 'CM', 'Croatia', '🇭🇷', 'Real Madrid', '10s', 'club', 'hero', ['CAM']),
  p('Manuel Neuer', 92, 'GK', 'Germany', '🇩🇪', 'Bayern Munich', '10s', 'club', 'icon'),
  p('Toni Kroos', 90, 'CM', 'Germany', '🇩🇪', 'Real Madrid', '10s', 'club', 'epic', ['CDM']),
  p('Sergio Busquets', 89, 'CDM', 'Spain', '🇪🇸', 'Barcelona', '10s', 'club', 'epic'),
  p('Neymar', 92, 'LW', 'Brazil', '🇧🇷', 'Barcelona', '10s', 'club', 'hero', ['CAM']),
  p('Luis Suárez', 91, 'ST', 'Uruguay', '🇺🇾', 'Barcelona', '10s', 'club', 'hero'),
  p('Robert Lewandowski', 92, 'ST', 'Poland', '🇵🇱', 'Bayern Munich', '10s', 'club', 'icon'),
  p('Eden Hazard', 90, 'LW', 'Belgium', '🇧🇪', 'Chelsea', '10s', 'club', 'epic', ['CAM']),
  p('Gareth Bale', 89, 'RW', 'Wales', '🏴󠁧󠁢󠁷󠁬󠁳󠁿', 'Real Madrid', '10s', 'club', 'rare'),
  p('Andrés Iniesta', 90, 'CM', 'Spain', '🇪🇸', 'Spain', '10s', 'national', 'hero', ['CAM']),
  p('Arjen Robben', 90, 'RW', 'Netherlands', '🇳🇱', 'Bayern Munich', '10s', 'club', 'epic'),
  p('Philipp Lahm', 89, 'RB', 'Germany', '🇩🇪', 'Bayern Munich', '10s', 'club', 'epic', ['CDM']),
  p('Thiago Silva', 89, 'CB', 'Brazil', '🇧🇷', 'PSG', '10s', 'club', 'rare'),

  // ---------- 20s ----------
  p('Kylian Mbappé', 93, 'ST', 'France', '🇫🇷', 'PSG', '20s', 'club', 'epic', ['LW']),
  p('Erling Haaland', 92, 'ST', 'Norway', '🇳🇴', 'Man City', '20s', 'club', 'epic'),
  p('Jude Bellingham', 90, 'CAM', 'England', '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'Real Madrid', '20s', 'club', 'epic', ['CM']),
  p('Jamal Musiala', 88, 'CAM', 'Germany', '🇩🇪', 'Bayern Munich', '20s', 'club', 'rare', ['LW']),
  p('Lamine Yamal', 87, 'RW', 'Spain', '🇪🇸', 'Barcelona', '20s', 'club', 'rare'),
  p('Florian Wirtz', 88, 'CAM', 'Germany', '🇩🇪', 'Leverkusen', '20s', 'club', 'rare'),
  p('Vinícius Júnior', 91, 'LW', 'Brazil', '🇧🇷', 'Real Madrid', '20s', 'club', 'epic'),
  p('Rodri', 91, 'CDM', 'Spain', '🇪🇸', 'Man City', '20s', 'club', 'epic'),
  p('Kevin De Bruyne', 91, 'CAM', 'Belgium', '🇧🇪', 'Man City', '20s', 'club', 'hero', ['CM']),
  p('Virgil van Dijk', 90, 'CB', 'Netherlands', '🇳🇱', 'Liverpool', '20s', 'club', 'epic'),
  p('Mohamed Salah', 90, 'RW', 'Egypt', '🇪🇬', 'Liverpool', '20s', 'club', 'epic'),
  p('Achraf Hakimi', 86, 'RB', 'Morocco', '🇲🇦', 'PSG', '20s', 'club', 'rare', ['RWB']),
  p('Theo Hernández', 85, 'LB', 'France', '🇫🇷', 'AC Milan', '20s', 'club', 'rare', ['LWB']),
  p('Alisson', 89, 'GK', 'Brazil', '🇧🇷', 'Liverpool', '20s', 'club', 'rare'),
  p('Pedri', 87, 'CM', 'Spain', '🇪🇸', 'Barcelona', '20s', 'club', 'rare', ['CAM']),
  p('Declan Rice', 86, 'CDM', 'England', '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'Arsenal', '20s', 'club', 'rare', ['CM']),
  p('Antonio Rüdiger', 86, 'CB', 'Germany', '🇩🇪', 'Real Madrid', '20s', 'club', 'rare'),
  p('Bukayo Saka', 87, 'RW', 'England', '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'Arsenal', '20s', 'club', 'rare', ['RM']),
]

// Secret ultra-rare prime cards (Pack Opening only)
export const SECRET_PLAYERS: Player[] = [
  p('Prime Pelé', 99, 'CF', 'Brazil', '🇧🇷', 'Santos', '70s', 'national', 'secret', ['ST', 'CAM']),
  p('Prime Ronaldo', 98, 'ST', 'Brazil', '🇧🇷', 'Brazil', '90s', 'national', 'secret'),
  p('Prime Messi', 99, 'RW', 'Argentina', '🇦🇷', 'Barcelona', '10s', 'club', 'secret', ['CAM']),
  p('Prime Ronaldo CR7', 98, 'ST', 'Portugal', '🇵🇹', 'Real Madrid', '10s', 'club', 'secret'),
  p('Prime Ronaldinho', 97, 'CAM', 'Brazil', '🇧🇷', 'Barcelona', '00s', 'club', 'secret', ['LW']),
  p('Prime Zidane', 98, 'CAM', 'France', '🇫🇷', 'Real Madrid', '00s', 'club', 'secret'),
]

export const ALL_CARDS = [...PLAYERS, ...SECRET_PLAYERS]
