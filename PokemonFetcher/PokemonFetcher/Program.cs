using System.Text.Json.Nodes;

namespace PokemonFetcher;

class Program
{
    static void Main(string[] args)
    {
        var jsonObject = FetchPokemon(0, 20);
        var pokemonArray = jsonObject["results"].AsArray();
        var htmlGenerator = new HtmlBuilder();
        htmlGenerator.OpenTag("table");
        foreach (var pokemon in pokemonArray)
        {
            BuildSinglePokemon(ref htmlGenerator, pokemon);
        }

        htmlGenerator.CloseTag();
        Console.WriteLine(htmlGenerator.ToString());
    }

    private static void BuildSinglePokemon(ref HtmlBuilder htmlGenerator, JsonNode pokemon)
    {
        string index = pokemon["url"].ToString().Split("/")[6];
        
        pokemon = FetchJson(pokemon["url"].ToString());
        
        string pokedexNumber = $"#{index.PadLeft(3, '0')}";
        string name = pokemon["name"].ToString();
        string image =
            "<img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
            index + ".png' alt=\"\"/>";
        string type = string.Join('/', pokemon["types"]
            .AsArray()
            .Select(type => type["type"]["name"]
                .ToString()));
        var stats = pokemon["stats"]
            .AsArray()
            .Select(stat =>
        {
            string statName = stat["stat"]["name"].ToString();
            string baseStat = stat["base_stat"].ToString();
            return $"{statName}: {baseStat}";
        });

        htmlGenerator.OpenTag("tr");

        htmlGenerator.OpenTag("td");
        htmlGenerator.InsertText(pokedexNumber);
        htmlGenerator.CloseTag();

        htmlGenerator.OpenTag("td");
        htmlGenerator.InsertText(image);
        htmlGenerator.CloseTag();

        htmlGenerator.OpenTag("td");
        htmlGenerator.InsertText(name);
        htmlGenerator.CloseTag();
        
        htmlGenerator.OpenTag("td");
        htmlGenerator.InsertText(type);
        htmlGenerator.CloseTag();
        
        htmlGenerator.OpenTag("td");
        htmlGenerator.OpenTag("ul");
        foreach (var stat in stats)
        {
            htmlGenerator.OpenTag("li");
            htmlGenerator.InsertText(stat);
            htmlGenerator.CloseTag();
        }
        htmlGenerator.CloseTag();
        htmlGenerator.CloseTag();

        htmlGenerator.CloseTag();
    }

    private static string Fetch(string url)
    {
        using HttpClient client = new();
        var response = client.GetAsync(url).Result;
        response.EnsureSuccessStatusCode();
        var content = response.Content.ReadAsStringAsync().Result;
        return content;
    }

    private static JsonObject FetchJson(string url)
    {
        string content = Fetch(url);
        var jsonObject = JsonNode.Parse(content).AsObject();
        return jsonObject;
    }
    private static JsonObject FetchPokemon(int offset, int num)
    {
        return FetchJson($"https://pokeapi.co/api/v2/pokemon?offset={offset}&limit={num}");
    }
}

public class HtmlBuilder()
{
    private Stack<string> _tagStack = new();
    private System.Text.StringBuilder _htmlBuilder = new();

    public void OpenTag(string tag)
    {
        _tagStack.Push(tag);
        _htmlBuilder.Append($"<{tag}>");
    }

    public void InsertText(string text)
    {
        _htmlBuilder.Append(text);
    }

    public void CloseTag()
    {
        var tag = _tagStack.Pop();
        _htmlBuilder.Append($"</{tag}>");
    }

    public override string ToString()
    {
        return _htmlBuilder.ToString();
    }
}