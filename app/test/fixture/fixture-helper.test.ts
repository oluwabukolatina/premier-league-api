import FixtureHelper from '../../component/fixture/fixture.helper';

describe('fixture helper', () => {
  it('generates link', async () => {
    const link = FixtureHelper.generateLink('Tottenham Hotspur', 'Arsenal');
    expect(link.startsWith('http')).toBe(true);
  });
});
