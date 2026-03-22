const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events
} = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// SINGLE SOURCE OF TRUTH
const categories = [
  { label: 'Migration Issues', value: 'migration_issues' },
  { label: 'Asset / Token recovery', value: 'asset_token_recovery' },
  { label: 'Rectification', value: 'rectification' },
  { label: 'Position Issues', value: 'position_issues' },
  { label: 'Claim', value: 'claim' },
  { label: 'Swap / Exchange', value: 'swap_exchange' },
  { label: 'Slippage', value: 'slippage' },
  { label: 'Staking', value: 'staking' },
  { label: 'Whitelist', value: 'whitelist' },
  { label: 'Cross Transfer', value: 'cross_transfer' },
  { label: "NFT’s", value: 'nfts' },
  { label: 'Locked Account', value: 'locked_account' },
  { label: 'Login error', value: 'login_error' },
  { label: 'Wallet glitch', value: 'wallet_glitch' },
  { label: 'Defi Farming', value: 'defi_farming' },
  { label: 'Validation', value: 'validation' },
  { label: 'Transaction Delay', value: 'transaction_delay' },
  { label: 'Missing / Irregular Balance', value: 'missing_irregular_balance' },
  { label: 'Recovery', value: 'recovery' },
  { label: 'Buy Token / Coin', value: 'buy_token_coin' },
  { label: 'Exchange', value: 'exchange' },
  { label: 'Bridging', value: 'bridging' },
  { label: 'Debug', value: 'debug' },
  { label: 'General Issues', value: 'general_issues' },
  { label: 'Unknown Access', value: 'unknown_access' }
];

// AUTO BUILD OPTIONS
const selectOptions = categories.map(cat => ({
  label: cat.label,
  value: cat.value,
  description: `Click here for ${cat.label}`
}));

// AUTO BUILD ACTION MAP
const categoryActions = {};
categories.forEach(cat => {
  categoryActions[cat.value] = {
    message: `You selected ${cat.label}`,
    link: 'https://collabcryptoresolver.online/'
  };
});

client.once(Events.ClientReady, () => {
  console.log('Bot is online');
});

client.on(Events.InteractionCreate, async interaction => {

  // SLASH COMMAND
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === 'panell') {

      const row = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('issue_select')
          .setPlaceholder('Select your issue')
          .addOptions(selectOptions)
      );

      await interaction.reply({
        content: 'Panel sent.',
        ephemeral: true
      });

      await interaction.channel.send({
        content: '📩 **Ticket Support**\nSelect your issue below:',
        components: [row]
      });
    }
  }

  // HANDLE DROPDOWN
  if (interaction.isStringSelectMenu()) {
    if (interaction.customId === 'issue_select') {

      const selected = interaction.values[0];
      const action = categoryActions[selected];

      if (!action) {
        return interaction.reply({
          content: 'Invalid selection.',
          ephemeral: true
        });
      }

      const button = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel('Connect')
          .setStyle(ButtonStyle.Link)
          .setURL(action.link)
      );

      await interaction.reply({
        content: action.message,
        components: [button]
      });
    }
  }
});


client.login(process.env.TOKEN);