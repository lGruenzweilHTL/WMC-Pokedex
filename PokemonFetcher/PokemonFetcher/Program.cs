using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text.Json.Nodes;

namespace PokemonFetcher;

class Program
{
    static void Main(string[] args)
    {
        if (!ArgsValid(args, out string mainPagePath, out string subPageDirectory, out string stylesheetPath))
        {
            return;
        }

        // Build main page
        var jsonObject = FetchPokemon(0, 151);
        var pokemonArray = jsonObject["results"].AsArray();
        var htmlGenerator = new HtmlBuilder();
        htmlGenerator.OpenTag("table");
        foreach (var pokemon in pokemonArray)
        {
            BuildSinglePokemon(ref htmlGenerator, subPageDirectory, pokemon);
        }

        htmlGenerator.CloseTag();
        Console.WriteLine(htmlGenerator.ToString());
    }

    private static void BuildSinglePokemon(ref HtmlBuilder mainPageGenerator, string subPageDirectory, JsonNode pokemon)
    {
        #region Get Data

        string index = pokemon["url"].ToString().Split("/")[6];

        pokemon = FetchJson(pokemon["url"].ToString());

        string pokedexNumber = $"#{index.PadLeft(3, '0')}";
        string name = pokemon["name"].ToString();
        string image =
            "<img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" +
            index + ".png' alt=\"\"/>";
        string type = string.Join('/', pokemon["types"]
            .AsArray()
            .Select(type =>
            {
                var t = type["type"]["name"];
                return $"<a href=\"types.html#{t}\">{t}</a>";
            }));
        var stats = pokemon["stats"]
            .AsArray()
            .Select(stat =>
            {
                string statName = stat["stat"]["name"].ToString();
                string baseStat = stat["base_stat"].ToString();
                return $"{statName}: {baseStat}";
            });
        var locations = JsonObject.Parse(Fetch(pokemon["location_area_encounters"].ToString())).AsArray()
            .Select(location => location["location_area"]["name"].ToString());

        #endregion

        #region Build main page content

        mainPageGenerator.OpenTag("tr");

        mainPageGenerator.OpenTag("td");
        mainPageGenerator.InsertText(pokedexNumber);
        mainPageGenerator.CloseTag();

        mainPageGenerator.OpenTag("td");
        mainPageGenerator.InsertText(image);
        mainPageGenerator.CloseTag();

        mainPageGenerator.OpenTag("td");
        mainPageGenerator.InsertText(name);
        mainPageGenerator.CloseTag();

        mainPageGenerator.OpenTag("td");
        mainPageGenerator.InsertText(type);
        mainPageGenerator.CloseTag();

        mainPageGenerator.OpenTag("td");
        mainPageGenerator.OpenTag("ul class=\"stats\"");
        foreach (var stat in stats)
        {
            mainPageGenerator.OpenTag("li");
            mainPageGenerator.InsertText(stat);
            mainPageGenerator.CloseTag();
        }

        mainPageGenerator.CloseTag();
        mainPageGenerator.CloseTag();

        mainPageGenerator.OpenTag("td");
        mainPageGenerator.OpenTag("ul class=\"locations\"");
        foreach (var location in locations)
        {
            mainPageGenerator.OpenTag("li");
            mainPageGenerator.InsertText(location);
            mainPageGenerator.CloseTag();
        }

        mainPageGenerator.CloseTag();
        mainPageGenerator.CloseTag();

        mainPageGenerator.CloseTag();

        #endregion

        #region Build sub page content

        var subPageGenerator = new HtmlBuilder();

        File.WriteAllText(Path.Combine(subPageDirectory, $"{name}.html"), subPageGenerator.ToString());

        #endregion
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

    private static bool ArgsValid(string[] args, out string mainPagePath, out string subPagePath,
        out string stylesheetPath)
    {
        mainPagePath = string.Empty;
        subPagePath = string.Empty;
        stylesheetPath = string.Empty;

        // Expected args: Main page path, Subpage directory path, Stylesheet path, Pokemon count
        if (args.Length != 3)
        {
            Console.WriteLine("Invalid number of arguments.");
            return false;
        }

        mainPagePath = args[0];
        subPagePath = args[1];
        stylesheetPath = args[2];
        return true;
    }
}

public class HtmlBuilder()
{
    private Stack<string> _tagStack = new();
    private System.Text.StringBuilder _htmlBuilder = new();

    public void OpenDocument(string title, string? stylesheet = null)
    {
        string stylesheetLink = stylesheet != null ? $"<link rel=\"stylesheet\" href=\"{stylesheet}\">" : string.Empty;
        _htmlBuilder.Append(
            $"<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><title>{title}</title>{stylesheetLink}</head><body>");
    }

    public void CloseDocument()
    {
        _htmlBuilder.Append("</body></html>");
    }

    public void OpenTag(string tag)
    {
        _tagStack.Push(tag.Split(' ')[0]);
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