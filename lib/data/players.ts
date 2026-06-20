import type { Player } from '@/lib/types'

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

// 1. ADIM: Oyuncuları sezon ve takım bazlı grupladık (SQUAD_POOLS)
export const SQUAD_POOLS: Record<string, Player[]> = {
  'Real Madrid 2017': [
    p('Cristiano Ronaldo', 95, 'ST', 'Portugal', '🇵🇹', 'Real Madrid', '10s', 'club', 'icon', ['LW']),
    p('Sergio Ramos', 91, 'CB', 'Spain', '🇪🇸', 'Real Madrid', '10s', 'club', 'hero', ['RB']),
    p('Luka Modrić', 91, 'CM', 'Croatia', '🇭🇷', 'Real Madrid', '10s', 'club', 'hero', ['CAM']),
    p('Toni Kroos', 90, 'CM', 'Germany', '🇩🇪', 'Real Madrid', '10s', 'club', 'epic', ['CDM']),
    p('Gareth Bale', 89, 'RW', 'Wales', '🏴󠁧󠁢󠁷󠁬󠁳󠁿', 'Real Madrid', '10s', 'club', 'rare'),
  ],
  'Barcelona 2011': [
    p('Lionel Messi', 95, 'RW', 'Argentina', '🇦🇷', 'Barcelona', '10s', 'club', 'icon', ['CAM', 'CF']),
    p('Xavi', 92, 'CM', 'Spain', '🇪🇸', 'Barcelona', '00s', 'club', 'icon'),
    p('Andrés Iniesta', 92, 'CM', 'Spain', '🇪🇸', 'Barcelona', '00s', 'club', 'icon', ['CAM']),
    p('Carles Puyol', 90, 'CB', 'Spain', '🇪🇸', 'Barcelona', '00s', 'club', 'hero'),
  ],
  // Diğer tüm oyuncularını burada sezon sezon gruplayabilirsin.
  // Eski tekil liste yapısını korumak istersen, aşağıdaki PLAYERS dizisini kullanmaya devam edebilirsin.
}

// Mevcut yapının bozulmaması için tüm oyuncuları burada tutuyoruz
export const PLAYERS: Player[] = [
  // ... (Senin paylaştığın tüm oyuncu listesi buraya gelecek, 
  // yukarıdaki SQUAD_POOLS içindeki oyuncuları da buraya ekleyerek listeyi tamamla)
  p('Pelé', 95, 'CF', 'Brazil', '🇧🇷', 'Brazil', '70s', 'national', 'icon', ['ST', 'CAM']),
  // ... (diğer oyuncular aynen devam)
]

export const SECRET_PLAYERS: Player[] = [
  p('Prime Pelé', 99, 'CF', 'Brazil', '🇧🇷', 'Santos', '70s', 'national', 'secret', ['ST', 'CAM']),
  // ... (diğer secret oyuncular aynen devam)
]

export const ALL_CARDS = [...PLAYERS, ...SECRET_PLAYERS]
